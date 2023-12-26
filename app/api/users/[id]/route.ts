import {conn } from '../../../db/db'
import { NextResponse } from 'next/server'

export async function GET(request: any, context: { params: { id: number } }) {
    const { id } = context.params;
  
    // Aquí puedes utilizar id en tu consulta SQL
    const result = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
  
    return NextResponse.json(result);
  }