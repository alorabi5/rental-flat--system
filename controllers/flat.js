const express = require("express");
const router = express.Router();
const Flat = require("../models/flat.js");

router.get("/", async (req, res) => {
  try {
    const flats = await Flat.find({});
    res.status(200).json(flats);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:flatId", async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.flatId);
    res.status(200).json(flat);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const flat = await Flat.create(req.body);
    res.status(201).json(flat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/:flatId", async (req, res) => {
  try {
    const updatedFlat = await Flat.findByIdAndUpdate(
      req.params.flatId,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedFlat);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:flatId", async (req, res) => {
  try {
    const deleteFlat = await Flat.findByIdAndDelete(req.params.flatId);

    res.status(200).json(deleteFlat);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;