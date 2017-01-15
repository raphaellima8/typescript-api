import * as express from 'express';
import {Application} from 'express';
import {initApi} from './api/api';
import {onError} from './api/responses/errorHandler';
const bodyParser = require('body-parser');

const app: Application = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

initApi(app);

app.use(onError);

app.listen(8090, () => {
  console.log('Server is running');
});
