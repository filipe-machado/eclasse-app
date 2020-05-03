/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

/**
 * ESSE ARQUIVO AINDA NAO TEM AS DEPENDENCIAS INSTALADAS
 */
import express from 'express';
import favicon from 'express-favicon';
import { join } from 'path';

const port = process.env.PORT || 8080;
const app = express();
app.use(favicon(`${__dirname}/build/favicon.ico`));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(join(__dirname, 'build')));
app.get('/ping', (_req, res) => res.send('pong'));
app.get('/*', (_req, res) => {
  res.sendFile(join(__dirname, 'build', 'index.html'));
});
app.listen(port);
