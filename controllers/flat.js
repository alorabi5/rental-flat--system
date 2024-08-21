// controllers/flat.js
const express = require("express");
const router = express.Router();
const Flat = require("../models/flat.js");
const User = require("../models/user.js");
router.get("/", async (req, res) => {
  try {
    const flats = await Flat.find({});
    res.status(200).json(flats);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/owner", async (req, res) => {
  try {
    // Get a list of flats where the ownerId is the current user
    const flats = await Flat.find({ userId: req.user._id });

    // Get the user by the token
    const user = await User.findById(req.user._id);

    // Only if the user isOwner can see the flats he created
    if (!user.isOwner) {
      return res.status(401).json({ error: "Unauthorized" });
    }
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
    // Get the user by the token
    const user = await User.findById(req.user._id);

    // Only if the user isOwner can create a flat
    if (!user.isOwner) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Create the flat with the ownerId set to the current user
    const flat = await Flat.create({
      ...req.body,
      ownerId: req.user._id,
    });

    res.status(201).json(flat);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:flatId", async (req, res) => {
  try {
    // Get the user by the token
    const user = await User.findById(req.user._id);

    // Only if the user isOwner can update flat
    if (!user.isOwner) {
      return res.status(401).json({ error: "Unauthorized" });
    }

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
    // Get the user by the token
    const user = await User.findById(req.user._id);

    // Only if the user isOwner can delete flat
    if (!user.isOwner) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const deleteFlat = await Flat.findByIdAndDelete(req.params.flatId);

    res.status(200).json(deleteFlat);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;