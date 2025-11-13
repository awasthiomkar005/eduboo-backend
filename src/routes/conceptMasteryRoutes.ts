import { Router } from "express";
import { ConceptMasteryController } from "../controllers/conceptMasteryController";
import {
  validateCreateConceptMastery,
  validateUpdateConceptMastery,
} from "../validators/conceptMasteryValidator";

const router = Router();
const controller = new ConceptMasteryController();

router.post("/create", validateCreateConceptMastery, controller.create);
router.get("/getAll", controller.getAll);
router.get("/user/:user_id", controller.getByUser);
router.get("/:concept_id", controller.getById);
router.put("/update/:concept_id", validateUpdateConceptMastery, controller.update);
router.delete("/delete/:concept_id", controller.delete);

export default router;
