import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('UsersService', () => {
  let service: UsersService;

  const repository = {
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    findOneBy: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('should create and save a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      const user = {
        id: '123',
        ...createUserDto,
      } as User;

      repository.create.mockReturnValue(user);
      repository.save.mockResolvedValue(user);

      const result = await service.create(createUserDto);

      expect(repository.create).toHaveBeenCalledWith(createUserDto);
      expect(repository.save).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
        },
        {
          id: '2',
          name: 'Jane Doe',
          email: 'jane@example.com',
        },
      ] as User[];

      repository.find.mockResolvedValue(users);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
      } as User;

      repository.findOneBy.mockResolvedValue(user);

      const result = await service.findOne('123');

      expect(repository.findOneBy).toHaveBeenCalledWith({
        id: '123',
      });

      expect(result).toEqual(user);
    });

    it('should return null when user does not exist', async () => {
      repository.findOneBy.mockResolvedValue(null);

      const result = await service.findOne('123');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
      };

      const existingUser = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
      } as User;

      const updatedUser = {
        ...existingUser,
        ...updateUserDto,
      };

      repository.findOneBy.mockResolvedValue(existingUser);

      repository.update.mockResolvedValue({
        affected: 1,
        generatedMaps: [],
        raw: {},
      });

      repository.findOne.mockResolvedValue(updatedUser);

      const result = await service.update('123', updateUserDto);

      expect(repository.findOneBy).toHaveBeenCalledWith({
        id: '123',
      });

      expect(repository.update).toHaveBeenCalledWith('123', updateUserDto);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '123' },
      });

      expect(result).toEqual(updatedUser);
    });

    it('should throw NotFoundException when user does not exist', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
      };

      repository.findOneBy.mockResolvedValue(null);

      await expect(service.update('123', updateUserDto)).rejects.toThrow(
        NotFoundException,
      );

      expect(repository.update).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should delete a user by id', async () => {
      const deleteResult = {
        affected: 1,
      };

      repository.delete.mockResolvedValue(deleteResult);

      const result = await service.remove('123');

      expect(repository.delete).toHaveBeenCalledWith('123');
      expect(result).toEqual(deleteResult);
    });
  });
});
