import { Model, INTEGER, NUMBER } from 'sequelize';
import db from '.';

class Account extends Model {
  id!: number;
  balance!: string;
}

Account.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: {
    type: NUMBER,
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'Account',
  tableName: 'Accounts',
  timestamps: false,
});

export default Account