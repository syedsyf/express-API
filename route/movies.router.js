import express from  'express';
import auth from '../middleware/auth.js';
import { getAllMovies, getMoviById, updateMoviById,deleteMoviById, createMovi } from '../services/movies.services.js';


const router = express.Router();


router.route("/").get(auth,getAllMovies).post(createMovi);
router.route("/:id").get(auth,getMoviById).put(updateMoviById).delete(deleteMoviById);
export default router;