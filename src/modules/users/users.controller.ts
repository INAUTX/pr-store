import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Get('username/:username')
  async findOneByUsername(@Param('username') username: string): Promise<User> {
    return this.userService.findOneByUsername(username);
  }

  @Post()
  async create(@Body() userData: { username: string; password: string; role: string }): Promise<User> {
    const { username, password, role } = userData;
    return this.userService.create(username, password, role);
  }
  

  @Put(':id/role')
  async changeUserRole(@Param('id') userId: number, @Body('role') roleName: string): Promise<User> {
    return this.userService.changeUserRole(userId, roleName);
  }
}
