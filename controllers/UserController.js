const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;

const UserController = {
  async create(req, res, next) {
    try {
      console.log('Request Body:', req.body);
      let hash = "";
      if (req.body.password) {
        hash = bcrypt.hashSync(req.body.password, 10);
      }
      const user = await User.create({
        ...req.body,
        password: hash,
        confirmed: false,
        role: "user",
      });
      res.status(201).send({ message: "User created successfully.", user });
    } catch (error) {
      next(error);
    }
  },

  async confirm(req, res) {
    try {
      const token = req.params.emailToken;
      const payload = jwt.verify(token, jwt_secret);
      const user = await User.findOneAndUpdate(
        { email: payload.email },
        { confirmed: true },
        { new: true },
      );
      if (!user) { return res.status(400).send({ error: 'Invalid or expired confirmation' }) }
      res.status(201).send("User confirmed successfully!");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error confirming email");
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .send({ error: "Please enter both email and password." });
      }
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).send({ message: "Incorrect user or password" });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send({ message: "Incorrect user or password" });
      }
      if (!user.confirmed) {
        return res.status(400).send({ message: "Your user is not confirmed yet, please check later or get in contact with us" });
      }
      const token = jwt.sign({ _id: user._id }, jwt_secret);
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      return res.status(200).send({ message: `Welcome ${user.firstName}`, token, user });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send(`Error while trying to connect the current user`, error);
    }
  },

  async updateProfile(req, res) {
    try {
      if (!req.user._id) {
        return res.status(400).send({ message: "Register user first" });
      }

      let foundUser = await User.findById(req.user._id);

      if (!foundUser) {
        return res.status(400).send({ message: "User not found" });
      }
      let updateFields = {};

      // if (req.file) {
      //   if (foundUser.avatar) {
      //     await fs.unlink(`uploads/${foundUser.avatar}`);
      //   }
      //   updateFields.avatar = req.file.filename;
      // }
      if (req.body.password) {
        updateFields.password = bcrypt.hashSync(req.body.password, 10);
      }

      foundUser = await User.findByIdAndUpdate(req.user._id, updateFields, {
        new: true,
      });

      res.status(200).send({ message: "User updated", foundUser });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async getLoggedUser(req, res) {
    try {
      const user = await User.findById({ _id: req.user._id })
        .populate({
          path: 'recipeIds',
          select: "recipeName type"
        })
      res.status(200).send(user);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: `Error while trying to get the current user` }, error);
    }
  },

  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res
        .status(200)
        .send({ message: `Disconnected, see you soon ${req.user.firstName}!` });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: `Error while trying to disconnect the current user`,
        error,
      });
    }
  },

  async getById(req, res, next) {
    try {
      const foundUser = await User.findById({ _id: req.params._id });
      if (!foundUser) {
        return res.status(400).send({ message: `ID: ${req.params._id} not found` });
      } else {
        return res.status(200).send(foundUser);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

module.exports = UserController;
