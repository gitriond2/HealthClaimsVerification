// pages/api/verify-claims/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key'; // Reemplaza esto con tu clave secreta

// Función para verificar el token JWT
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

    // Lógica para verificar las reclamaciones
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
