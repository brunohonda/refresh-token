import cors from 'cors';
import express from 'express';

import authRouter from './api/auth/auth.routing.mjs';
import usersRouter from './api/users/users.routing.mjs';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
