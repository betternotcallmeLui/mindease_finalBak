const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await new UserModel({
      username,
      // email,
      password,
    });
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    const token = jwt.sign({ id: user._id }, "123");

    res.status(201).json({ success: true, token: token, user: user });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "El usuario ya existe." });
    }
    res.status(500).json({ message: "Algo va mal" });
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
      username: username,
      userId: user._id,
    });
  } catch {
    res.status(404).json({ success: false, error: "Nombre de usuario erróneo." });
  }
};

// exports.editUser = async (req, res) => {
//   const { userId } = req.params;
//   const { email, username } = req.body;

//   try {
//     const user = await UserModel.findByIdAndUpdate(
//       userId,
//       { email, username },
//       { new: true }
//     );

//     res.status(200).json({ success: true, user });
//   } catch (error) {
//     res.status(500).json({ message: "Error al editar el usuario." });
//   }
// };
