const express = require("express");

const partController = require("../controllers/parts.controller");
const compatibleModelController = require("../controllers/compatible-models.controller");

const router = express.Router();

router.get("/", partController.getAll);
router.post("/", partController.add);
router.route("/:partId") 
    .get(partController.get)
    .put(partController.update)
    .patch(partController.patch)
    .delete(partController.remove);

router.get("/:partId/models", compatibleModelController.getAll);
router.post("/:partId/models", compatibleModelController.add);
router.route("/:partId/models/:carModelId")
    .get(compatibleModelController.get)
    .put(compatibleModelController.update)
    .patch(compatibleModelController.patch)
    .delete(compatibleModelController.remove);



module.exports = {
    router
}
