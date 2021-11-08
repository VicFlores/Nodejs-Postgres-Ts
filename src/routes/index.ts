import express from 'express';
import usersRoute from './users.route';

const routerApi = (app: express.Application) => {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/users', usersRoute);
};

export default routerApi;
