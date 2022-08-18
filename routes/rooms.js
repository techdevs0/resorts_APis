import express from "express";
import { getRooms, createRoom, deleteRoom, findRoom } from "../controllers/rooms.js";
const router = express.Router();

router.get('/', getRooms)
router.get('/:id', findRoom)
router.post('/', createRoom)
router.delete('/:id', deleteRoom)

export default router;