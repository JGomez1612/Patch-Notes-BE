import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// GET /api/game/:id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(
            `https://api.rawg.io/api/games/${id}?key=${process.env.RAWG_API_KEY}`
        );
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Failed to fetch game" });
    }
});

export default router;