import express from "express";
import { getDinings, createDining, deleteDining, findDining } from "../controllers/dining.js";
const router = express.Router();

router.get('/', getDinings)
router.get('/:id', findDining)
router.post('/', createDining)
router.delete('/:id', deleteDining)

export default router;