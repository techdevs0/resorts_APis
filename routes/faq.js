import express from "express";
import { getFaqs, createFaq, deleteFaq, findFaq } from "../controllers/faq.js";
const router = express.Router();

router.get('/', getFaqs)
router.get('/:id', findFaq)
router.post('/', createFaq)
router.delete('/:id', deleteFaq)

export default router;