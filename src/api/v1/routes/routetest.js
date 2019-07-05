const router = require("express").Router();

router.get("/", (req, res) => res.json({ newStructure: true, success: true }));

module.exports = router;
