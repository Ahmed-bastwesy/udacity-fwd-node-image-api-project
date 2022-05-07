import express from 'express';
import images from './api/images';

const routes: express.Router = express.Router();

routes.use('/api/images', images);

routes.get(
  '/',
  (request: express.Request, response: express.Response): void => {
    // This could be done by serving views ... Just quick and dirty for now :-)
    response.send(
      '<h1>node project image api</h1>to use application write <code><a href="/api/images?filename="> /api/images?filename=(enter valid image here)</a> width and hight is optional</code><p>for example:<ul><li><a href="/api/images?filename=santamonica">/api/images?filename=santamonica</a></li><li><a href="/api/images?filename=santamonica&width=400&height=400">/api/images?filename=santamonica&width=400&height=400</a></li></ul></p>'
    );
  }
);

export default routes;
