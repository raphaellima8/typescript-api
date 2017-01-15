import * as express from 'express';
import {Application} from 'express';
import {initApi} from './api/api';
import {errorHandlerApi} from './api/errorHandlerApi';
const bodyParser = require('body-parser');

const app: Application = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

initApi(app);

app.use(errorHandlerApi);

app.listen(8090, () => {
  console.log('Server is running');
});
