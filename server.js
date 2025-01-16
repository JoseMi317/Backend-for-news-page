const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');
const authRoutes = require('./routes/Auth');
const userRoutes = require('./routes/adminRoutes');

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

sequelize.sync({ alter: true })
  .then(() => console.log('Conexión exitosa y modelo sincronizado'))
  .catch((err) => console.error('Error al sincronizar la base de datos:', err));

app.use('/api/auth', authRoutes);
app.use('/api/admin',userRoutes);

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
