import express from "express";
import { getWeddings, createWedding, deleteWedding, findWedding } from "../controllers/wedding.js";
const router = express.Router();

router.get('/', getWeddings)
router.get('/:id', findWedding)
router.post('/', createWedding)
router.delete('/:id', deleteWedding)

export default router;