import { Model, INTEGER, DATE } from 'sequelize';
import db from '.';
import Account from './Account';

class Transaction extends Model {
  id!: number;
  debitedAccountId!: string;
  creditedAccountId!: string;
  value!: string;
  createdAt!: Date;
}

Transaction.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  debitedAccountId: {
    type: INTEGER,
    allowNull: false,
  },
  creditedAccountId: {
    type: INTEGER,
    allowNull: false,
  },
  value: {
    type: INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'Transaction',
  tableName: 'Transactions',
  timestamps: false,
});

Transaction.belongsTo(Account, { foreignKey: 'debitedAccountId', as: 'debited' });
Transaction.belongsTo(Account, { foreignKey: 'creditedAccountId', as: 'credited' });

export default Transaction;