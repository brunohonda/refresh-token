import express from 'express';
import cors from 'cors';
import usersRouter from './users/users.routing.mjs';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
