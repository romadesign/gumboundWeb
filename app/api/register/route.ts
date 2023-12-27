import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "../../../libs/db";

export async function POST(request: any) {
  try {
    const data = await request.json()

    //email 
    const emailFound = await db.account.findUnique({
      where: {
        email: data.email,
      },
    })
    if (emailFound) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    //name
    const nameFound = await db.account.findUnique({
      where: {
        name: data.name,
      },
    })
    if (nameFound) {
      return NextResponse.json(
        {
          message: "name already exists",
        },
        {
          status: 400,
        }
      );
    }

    //username
    const usernameFound = await db.account.findUnique({
      where: {
        username: data.username,
      },
    });

    if (usernameFound) {
      return NextResponse.json(
        {
          message: "username already exists",
        },
        {
          status: 400,
        }
      );
    }

    //password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newAccount = await db.account.create({
      data: {
        email: data.email,
        name: data.name,
        username: data.username,
        password: hashedPassword,
      },
    });

    const { password: _, ...account } = newAccount;

    return NextResponse.json(account);

  } catch (error: any) {
    console.log('hasd')

    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }

    );
  }
}