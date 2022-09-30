import express from  'express';
import { getAllMovies, getMoviById, updateMoviById,deleteMoviById, createMovi } from './services/movies.services.js';


const router = express.Router();


router.route("/").get(getAllMovies).post(createMovi);
router.route("/:id").get(getMoviById).put(updateMoviById).delete(deleteMoviById);
export default router;