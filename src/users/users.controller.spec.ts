import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('UsersController', () => {
  let controller: UsersController;

  const usersService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const dto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      const user = {
        id: '123',
        ...dto,
      };

      usersService.create.mockResolvedValue(user);

      const result = await controller.create(dto);

      expect(usersService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [
        {
          id: '1',
          name: 'John Doe',
          email: 'johndoe@email.com',
        },
        {
          id: '2',
          name: 'Jane Doe',
          email: 'janedoe@gmail.com',
        },
      ];

      usersService.findAll.mockResolvedValue(users);

      const result = await controller.findAll();

      expect(usersService.findAll).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = {
        id: '123',
        name: 'John Doe',
      };

      usersService.findOne.mockResolvedValue(user);

      const result = await controller.findOne('123');

      expect(usersService.findOne).toHaveBeenCalledWith('123');
      expect(result).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const dto: UpdateUserDto = {
        name: 'Updated Name',
      };

      const user = {
        id: '123',
        name: 'Updated Name',
      };

      usersService.update.mockResolvedValue(user);

      const result = await controller.update('123', dto);

      expect(usersService.update).toHaveBeenCalledWith('123', dto);

      expect(result).toEqual(user);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const deleteResult = {
        affected: 1,
      };

      usersService.remove.mockResolvedValue(deleteResult);

      const result = await controller.remove('123');

      expect(usersService.remove).toHaveBeenCalledWith('123');
      expect(result).toEqual(deleteResult);
    });
  });
});
