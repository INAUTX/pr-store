import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/common/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['roles'] });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { username },
      relations: ['roles'],
    });
  }

  async create(username: string, password: string, role: string): Promise<User> {
    const newUser = this.userRepository.create({ username, password });
    const defaultRole = await this.roleRepository.findOne({ where: { name: role } });
    newUser.roles = [defaultRole];
    return await this.userRepository.save(newUser);
  }
  

  async changeUserRole(userId: number, roleName: string): Promise<User> {
    const user = await this.findOne(userId);
    const role = await this.roleRepository.findOne({ where: { name: roleName } });
    if (!role) throw new Error('Role not found');
    user.roles = [role];
    return await this.userRepository.save(user);
  }
}
