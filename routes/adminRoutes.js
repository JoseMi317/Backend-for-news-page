const express = require('express');
const router = express.Router();
const { isAdmin } = require('../controller/authcontroller');
const User = require('../models/Users');

router.get('/users', isAdmin, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'firstName', 'lastName', 'role']
    });

    res.status(200).json({
      message: 'Usuarios obtenidos con éxito',
      users: users
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al obtener usuarios',
      error: error.message
    });
  }
});

module.exports = router;
