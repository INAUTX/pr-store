import { Controller, Post, Delete, Param, Body, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async createTransaction(
    @Body('userId') userId: number,
    @Body('productId') productId: number,
    @Body('quantity') quantity: number,
  ): Promise<Transaction> {
    return this.transactionService.createTransaction(userId, productId, quantity);
  }

  @Get()
  findAll() {
    return this.transactionService.findAllTransactions();
  }

  @Delete(':id')
  async deleteTransaction(@Param('id') id: number): Promise<void> {
    return this.transactionService.deleteTransaction(id);
  }
}
