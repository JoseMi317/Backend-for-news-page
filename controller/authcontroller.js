const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const jwtSecret = process.env.JWT_SECRET || 'WpItcom';

const registerUser = async (req, res) => {
  const { username, email, password, firstName, lastName, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role
    });

    res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    console.log("Datos para JWT:", {
      id: user.id,
      nombre: user.firstName, // Corregí el campo a `firstName`
      role: user.role
    });

    const token = jwt.sign(
      { id: user.id, nombre: user.firstName, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};

const isAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    if (decoded.role !== 1) {
      return res.status(403).json({ message: 'Acceso denegado. Solo administradores' });
    }
    next();
  });
};

module.exports = { registerUser, login, isAdmin };
