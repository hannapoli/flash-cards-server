const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const frontendUrl = `${process.env.FRONT_URL}`;
const frontendLocalHost = `${process.env.FRONT_LOCALHOST}`;
const whitelist = [frontendUrl, frontendLocalHost];
const corsOptions = {
    origin: (origin, callback) => {
        //!origin para permitir las peticiones del Postman
        if (whitelist.includes(origin) || !origin) {
            //callback(error, allow)
            callback(null, true);
        } else {
            console.log('Origen no permitido por CORS:', origin);
            callback(new Error('Esta conexión no está permitida por CORS'));
        }
    },
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

// ================================== MIDDLEWARES ==================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api/v1/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(cors(corsOptions));

// ========================== EJS para la página principal: ==========================
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// ====================================== RUTAS ======================================
app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.use('/api/v1/auth', require('./routes/auth.routes'));

app.use('/api/v1/admin', require('./routes/admin.users.routes'));
app.use('/api/v1/admin', require('./routes/admin.lang.routes'));
app.use('/api/v1/admin', require('./routes/admin.categories.routes'));
app.use('/api/v1/admin', require('./routes/admin.words.routes'));

app.use('/api/v1/user', require('./routes/user.learning.routes'));
app.use('/api/v1/user', require('./routes/user.progress.routes'));

// =============================== Iniciar el servidor ===============================
app.listen(port, () => {
    console.log(`Servidor activo en el puerto ${port} 📡​`);
});