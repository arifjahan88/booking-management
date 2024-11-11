const express = require("express");
const {
  getLocation,
  getFilterSearch,
  updateFilterSearch,
} = require("../controllers/searchController");

const router = express.Router();

router.get("/get-location", getLocation);
router.get("/get-filtersearch", getFilterSearch);
router.post("/get-updatefiltersearch", updateFilterSearch);

module.exports = router;
