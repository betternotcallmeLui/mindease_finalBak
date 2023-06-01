const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserModel = require("../models/UserModel");

exports.register = async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;

  try {
    const user = await new UserModel({
      username,
      firstName,
      lastName,
      email,
      password,
    });

    user.password = await bcrypt.hash(user.password, 10);

    await user.save();
    const token = jwt.sign({ id: user._id }, "123");

    console.log("Usuario creado.")
    res.status(201).json({ success: true, token: token, user: user });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "El usuario ya existe." });
    }
    res.status(500).json({ message: "Algo va mal", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username: username });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ success: false, error: "Contraseña errónea." });
    }
    const token = jwt.sign({ id: user._id }, "123");

    res.status(200).json({
      success: true,
      isMatch,
      token: token,
      username: user.username,
      userId: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

exports.editAccount = async (req, res) => {
  const { username, firstName, lastName, email } = req.body;

  try {
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, error: "Usuario no encontrado." });
    }

    user.username = username || user.username;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({ success: true, user: user });
  } catch (error) {
    res.status(500).json({ message: "Algo va mal", error: error.message });
  }
};