import express from "express";
import { getPages, createPage, deletePage, findPage } from "../controllers/page.js";
const router = express.Router();

router.get('/', getPages)
router.get('/:id', findPage)
router.post('/', createPage)
router.delete('/:id', deletePage)

export default router;