import { Router } from "express";
import { PrismaClient } from "@prisma/client"

const router = Router();
const prisma = new PrismaClient();

router.get("/servers", async (req, res) => {
    const servers = await prisma.server.findMany();
    res.json(servers)
})

export default router;