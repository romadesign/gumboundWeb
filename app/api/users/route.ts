import {conn } from '../../db/db'
import { NextResponse } from 'next/server'

export async function GET(){
    const result = await conn.query('select * from users')
    return NextResponse.json(result)
}


  