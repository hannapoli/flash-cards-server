const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const frontendUrl = '';
const frontendLocalhost = '';
const whitelist = [frontendUrl, frontendLocalhost];
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
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

// ============= MIDDLEWARES =============
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cors(corsOptions));

// ============= EJS para la página principal: =============
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// ============= RUTAS =============
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.use('/api/v1/auth', require('./routes/auth.routes'));

app.use('/api/v1/admin', require('./routes/admin.users.routes'));
app.use('/api/v1/admin', require('./routes/admin.languages.routes'));
app.use('/api/v1/admin', require('./routes/admin.categories.routes'));
app.use('/api/v1/admin', require('./routes/admin.words.routes'));

app.use('/api/v1/user', require('./routes/user.learning.routes'));

//uploads.routes?

app.listen(port, () => {
    console.log(`Servidor activo en el puerto ${port} 📡​`);
});