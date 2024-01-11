import {Router} from "express";
import {PrismaClient} from "@prisma/client"

const router = Router();
const prisma = new PrismaClient();

router.get("/profiles", async (req, res) => {
    const profiles = await prisma.profile.findMany()
    res.json(profiles)
})

export default router;