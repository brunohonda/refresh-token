import { client } from "./db.mjs";

const UsersService = {
  create: async (user) => {
    const { username, password } = user;

    if (client.data.users.findIndex(user => user.username === username) >= 0) {
      throw new Error('Username already exists');
    }

    client.data.users.push({ username, password });
    return client.write();
  },
  getList: async () => {
    return client.data.users.map(user => ({ username: user.username }));
  }
};

export default UsersService;
