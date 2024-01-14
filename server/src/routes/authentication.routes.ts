import { Router } from "express";
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import { registerUser } from "./auth/registerService";

const app = express();
const router = Router();
app.use(bodyParser.json());


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

export default router;