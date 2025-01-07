# HealthClaimsVerification

Este proyecto es una aplicación de verificación de afirmaciones de salud, compuesta por un backend desarrollado en ASP.NET Core y un frontend desarrollado en Next.js.

## Estructura del Proyecto

- **Backend**: ASP.NET Core
- **Frontend**: Next.js
- **Base de Datos**: SQL Server
- **Cliente HTTP**: Axios

## Configuración del Backend

### Configuración de la Cadena de Conexión

Configura la cadena de conexión en el archivo `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=HealthClaimsDb;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
}
Configuración del Controlador en ASP.NET Core
Asegúrate de que el controlador ClaimsController esté configurado correctamente.

csharp
// Controllers/ClaimsController.cs
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using HealthClaimsVerification.Data;
using HealthClaimsVerification.Models;

[Route("api/[controller]")]
[ApiController]
public class ClaimsController : ControllerBase
{
    private readonly HealthClaimsContext _context;

    public ClaimsController(HealthClaimsContext context)
    {
        _context = context;
    }

    [HttpPost("verify-claims")]
    public async Task<IActionResult> VerifyClaims([FromBody] List<Claim> claims)
    {
        try
        {
            var verifiedClaims = await VerifyWithGeminiApi(claims);
            if (verifiedClaims == null)
            {
                return BadRequest("Error verifying claims");
            }
            return Ok(verifiedClaims);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error verifying claims: {ex.Message}\n{ex.StackTrace}");
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    private async Task<List<Claim>> VerifyWithGeminiApi(List<Claim> claims)
    {
        await Task.Delay(100); // Simulación de llamada asíncrona
        return claims;
    }
}
Configuración del Frontend
Estructura del Proyecto Next.js
plaintext
/pages
  ├── /api
  |    ├── /verify-claims
  |         ├── route.js
  ├── index.js
  ├── _app.js
  ├── _document.js
Archivo route.jspara Verificación de Reclamaciones
javascript
// pages/api/verify-claims/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key'; // Reemplaza esto con tu clave secreta

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    console.error('Token verification failed:', err);
    return null;
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { token, claims } = body;

    const verified = verifyToken(token);

    if (!verified) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const verifiedClaims = claims.map(claim => ({
      ...claim,
      VerificationStatus: 'Verified',
      TrustScore: 100
    }));

    return NextResponse.json(verifiedClaims, { status: 200 });
  } catch (err) {
    console.error('Error verifying claims:', err);
    return NextResponse.json({ error: 'Failed to verify claims' }, { status: 500 });
  }
}
Configuración de Servicios Adicionales
services.js
javascript
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
services/backendApi.js
javascript
import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false
});

const backendApi = axios.create({
  baseURL: 'https://localhost:5070/api', // URL del backend
  httpsAgent: agent
});

export default backendApi;
pages/index.js
javascript
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import InfluencerList from '../components/InfluencerList';
import ResearchForm from '../components/ResearchForm';
import Layout from '../components/Layout';
import { fetchInfluencers } from '../services/fetchInfluencers';

export default function Home() {
  const [influencers, setInfluencers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const getInfluencers = async () => {
      try {
        const data = await fetchInfluencers();
        setInfluencers(Array.isArray(data) ? data : []); // Asegurarse de que data es un array
      } catch (error) {
        setError(error);
      }
    };

    getInfluencers();
  }, []);

  useEffect(() => {
    // Este código solo se ejecutará en el lado del cliente
    const cspMetaTag = document.createElement('meta');
    cspMetaTag.httpEquiv = "Content-Security-Policy";
    cspMetaTag.content = "default-src 'self'; img-src 'self' https://localhost:5070;";
    document.head.appendChild(cspMetaTag);
  }, []);

  const filteredInfluencers = Array.isArray(influencers)
    ? influencers.filter(influencer =>
        influencer.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleResearchSubmit = (data) => {
    console.log('Research data:', data);
    // Lógica para manejar la configuración de investigación
  };

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-4">Influenciadores</h1>
      <input
        type="text"
        className="p-2 border border-blue-300 rounded-md w-full mb-4 text-black"
        placeholder="Buscar influenciadores"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="bg-white p-4 rounded-md shadow-md text-black">
        <InfluencerList influencers={filteredInfluencers} />
      </div>
      <ResearchForm onSubmit={handleResearchSubmit} />
      {error && <div className="error">Error: {error.message}</div>}
    </Layout>
  );
}
services/geminiApi.js
javascript
import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false
});

export const verifyClaims = async (claims) => {
  try {
    console.log("Claims to verify:", claims); // Log claims before sending to API
    
    const response = await axios.post('https://localhost:5070/api/verify-claims', { claims }, { httpsAgent: agent });

    // Log response status
    console.log("Response status:", response.status);

    if (response.status !== 200) {
      console.error("Error message from server:", response.data); // Log error message from server
      throw new Error(`Error verifying claims: ${response.data}`);
    }

    const data = response.data;
    console.log("Data received from server:", data); // Log the data received from the server
    return data;
  } catch (error) {
    console.error("Error in verifyClaims:", error);
    throw error;
  }
};
pages/_app.js
javascript
import '../styles/globals.css';
import '../styles/tailwind.css'; // Importa el archivo CSS de Tailwind
import React from 'react';
import ErrorBoundary 