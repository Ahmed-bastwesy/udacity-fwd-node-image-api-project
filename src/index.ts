import express from 'express';
import routes from './routes/index';
const app = express();
const port = 4000;

app.use(routes);

app.listen(port, async (): Promise<void> => {
  console.log(`server listening to port : ${port}`);
});

export default app;
