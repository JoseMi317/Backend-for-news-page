const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/Users'); 
const cors = require('cors'); // Importa CORS solo una vez

const app = express();
app.use(express.json()); 


app.use(cors({
  origin: 'http://localhost:3001',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, 
}));

sequelize.sync({ alter: true }) 
  .then(() => console.log('Conexión exitosa y modelo sincronizado'))
  .catch((err) => console.error('Error al sincronizar la base de datos:', err));

app.get('/', (req, res) => {
  res.send('¡Servidor funcionando!');
});

app.post('/api/users', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, role } = req.body;
    const newUser = await User.create({ username, email, password, firstName, lastName, role });
    res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
});

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
