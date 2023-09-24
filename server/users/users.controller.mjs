import UsersService from "../services/users.service.mjs";

const UsersController = {
  async create(req, res) {
    const { username, password } = req.body;

    try {
      await UsersService.create({ username, password });
      res.status(201).send();
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
};

export default UsersController;
