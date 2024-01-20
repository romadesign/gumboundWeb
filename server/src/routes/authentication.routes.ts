import { Router } from "express";
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import { registerUser } from "./auth/registerService";
import { loginService } from "./auth/loginService";
import cookieParser from 'cookie-parser';

const app = express();
const router = Router();
app.use(bodyParser.json());
app.use(cookieParser());


router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await loginService({ email, password });

  if (result.success) {
    const userData = result.user;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.cookie('profile', JSON.stringify(userData), {
      httpOnly: true, 
      maxAge: 24 * 60 * 60 * 1000, // Tiempo de expiración en milisegundos (aquí, 1 día)
      sameSite: 'strict',
      path: '/',
      secure: true,
    });

    res.cookie('status', JSON.stringify("authenticated"), {
      httpOnly: false, 
      maxAge: 24 * 60 * 60 * 1000, // Tiempo de expiración en milisegundos (aquí, 1 día)
      sameSite: 'strict',
      path: '/',
      secure: true,
    });

    res.status(200).json(result);
  } else {
    res.status(401).json(result);
  }
});


router.post("/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  console.log(name)

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Por favor, proporciona todos los campos.' });
  }

  const result = await registerUser({ name, email, password });

  if (result.success) {
    return res.status(201).json({ success: true, user: result.user });
  } else {
    return res.status(400).json({ success: false, message: result.message });
  }

})

router.post('/logout', (req, res) => {
  // Limpiar la cookie de sesión
  res.clearCookie('status');
  res.clearCookie('profile');
  res.json({ success: true });
});


export default router;