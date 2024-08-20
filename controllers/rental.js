// controllers/rental.js
const express = require('express');
const router = express.Router();
const Rental = require("../models/rental");
const Flat = require("../models/flat");

router.get ("/", async (req, res) => {
    try {
        // show rentals for all flats for a specific user id
        const rentals = await Rental.find({ userId: req.user._id })
        .populate("userId")
        .populate("flatId")
        res.status(200).json(rentals);
    } catch (error) {
        res.status(500).json(error);
    }
});

// show page for rental
router.get("/:rentalId", async (req, res) => {
    try {
        const rental = await Rental.findById(req.params.rentalId)
        .populate("userId")
        .populate("flatId")
        res.status(200).json(rental);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Create a rental | Book a flat
router.post("/", async (req, res) => {
    try {
        // Check if the flat is already booked
        const flat = await Flat.findById(req.body.flatId);
        if (!flat) {
            return res.status(404).json({ error: "Flat not found." });
        }
        if (flat.isBooked) {
            return res.status(400).json({ error: "Flat is already booked." });
        }
        // Create a new rental
        const rental = await Rental.create({
            userId: req.user._id,
            flatId: req.body.flatId,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
        });

        // Update the flat isBooked to true
        flat.isBooked = true;
        await flat.save();
        res.status(201).json(rental);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/:rentalId", async (req, res) => {
    try {
        // Only the user of the rental can update the rental
        const rental = await Rental.findById(req.params.rentalId);

        if (!rental) {
            return res.status(404).json({ error: "Rental not found." });
        }

        if (rental.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const updatedRental = await Rental.findByIdAndUpdate(
            req.params.rentalId,
            req.body,
            {new: true}
        );
        res.status(200).json(updatedRental);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/:rentalId", async (req, res) => {
    try {
        // Only the user of the rental can delete the rental
        const rental = await Rental.findById(req.params.rentalId);

        if (!rental) {
            return res.status(404).json({ error: "Rental not found." });
        }

        if (rental.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const deletedRental = await Rental.findByIdAndDelete(req.params.rentalId);

        // Update the flat isBooked to false
        const flat = await Flat.findById(deletedRental.flatId);
        if (!flat){
            return res.status(404).json({error: "Flat not found."});
        }
        flat.isBooked = false;
        await flat.save();

        res.status(200).json(deletedRental);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
