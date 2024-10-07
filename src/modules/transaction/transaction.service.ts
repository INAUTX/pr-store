import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createTransaction(userId: number, productId: number, quantity: number): Promise<Transaction> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!user || !product) throw new Error('User or Product not found');

    const transaction = this.transactionRepository.create({
      user,
      product,
      quantity,
      amount: product.price * quantity,
      date: new Date(),
    });

    return await this.transactionRepository.save(transaction);
  }

  async findAllTransactions(): Promise<Transaction[]> {
    return this.transactionRepository.find({ relations: ['user', 'product'] });
  }

  async deleteTransaction(id: number): Promise<void> {
    await this.transactionRepository.delete(id);
  }
}
