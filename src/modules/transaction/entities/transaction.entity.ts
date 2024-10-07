import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from 'src/modules/products/entities/product.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  amount: number;

  @Column()
  quantity: number;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;

  @ManyToOne(() => Product, (product) => product.transactions)
  product: Product;
}
