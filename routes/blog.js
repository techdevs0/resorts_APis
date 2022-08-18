import express from "express";
import { getBlogs, createBlog, deleteBlog, findBlog } from "../controllers/blog.js";
const router = express.Router();

router.get('/', getBlogs)
router.get('/:id', findBlog)
router.post('/', createBlog)
router.delete('/:id', deleteBlog)

export default router;