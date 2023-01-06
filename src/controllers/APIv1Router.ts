/* eslint-disable quotes */
import { Router } from "express";

import PokemonController from "@/controllers/APIv1/PokemonController";
import TrainerController from "@/controllers/APIv1/TrainerController";
import UserController from "@/controllers/APIv1/UserController";

const router = Router();

// Aggregates the two controllers under the same route (/api/v1/)
router.use("/pokemon", PokemonController);
router.use("/trainer", TrainerController);
router.use("/", UserController);

export default router;
