
const fs = require('fs');
const https = require('https');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

// Configurar CORS para permitir solicitudes desde el frontend
app.use(cors());

// Configurar CSP con helmet
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    imgSrc: ["'self'", "https://localhost:5070"],
    scriptSrc: ["'self'", "https://localhost:5070"],
    styleSrc: ["'self'", "'unsafe-inline'"]
  }
}));

app.use(express.json()); // Middleware para parsear JSON

// Leer los archivos de certificado
const privateKey = fs.readFileSync('C:\\certs\\private\\yourdomain.key', 'utf8');
const certificate = fs.readFileSync('C:\\certs\\yourdomain.crt', 'utf8');
const ca = fs.readFileSync('C:\\certs\\RootCA.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

// Configurar el servidor HTTPS
const httpsServer = https.createServer(credentials, app);

// Iniciar el servidor en el puerto 5070
httpsServer.listen(5070, () => {
  console.log('HTTPS Server running on port 5070');
});

// Tus rutas y middlewares
app.get('/', (req, res) => {
  res.send('Hello, HTTPS world!');
});

app.post('/api/verify-claims', (req, res) => {
  const claims = req.body.claims;
  // Procesar las claims aquí
  res.json({ message: 'Claims verificadas', claims });
});
