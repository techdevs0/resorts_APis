import express from "express";
import { getOffers, createOffer, deleteOffer, findOffer } from "../controllers/offer.js";
const router = express.Router();

router.get('/', getOffers)
router.get('/:id', findOffer)
router.post('/', createOffer)
router.delete('/:id', deleteOffer)

export default router;