import { describe, it, expect } from 'vitest';
import { UsersService } from './users.service';

describe('UsersService', () => {
  it('should be defined', () => {
    const service = new UsersService();

    expect(service).toBeDefined();
  });
});
