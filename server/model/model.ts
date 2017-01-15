import * as ORM from 'sequelize';
import {Sequelize, LoggingOptions} from 'sequelize';
import {initUserModel} from './initUserModel';

const dbUrl = 'postgres://postgres:pgroot@localhost:5432/api';
const options: LoggingOptions = {benchmark: true, logging:console.log};
const sequelize: Sequelize = new ORM(dbUrl, options);

export const UserModel = initUserModel(sequelize);
