const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Contact = require("./models/Contact");

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.log("MongoDB connection error:", error.message));

app.get("/", (req, res) => {
    res.send("Contact Management System is running");
});

// CREATE CONTACT
app.post("/contacts", async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();

        res.status(201).json({
            message: "Contact created successfully",
            contact
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                error: "Contact ID or email already exists"
            });
        }

        res.status(400).json({
            error: error.message
        });
    }
});

// GET ALL CONTACTS
app.get("/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find();

        res.json(contacts);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// GET CONTACT BY ID
app.get("/contacts/:id", async (req, res) => {
    try {
        const contact = await Contact.findOne({
            contactId: req.params.id
        });

        if (!contact) {
            return res.status(404).json({
                error: "Contact not found"
            });
        }

        res.json(contact);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// UPDATE CONTACT
app.put("/contacts/:id", async (req, res) => {
    try {
        const contact = await Contact.findOneAndUpdate(
            { contactId: req.params.id },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!contact) {
            return res.status(404).json({
                error: "Contact not found"
            });
        }

        res.json({
            message: "Contact updated successfully",
            contact
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                error: "Contact ID or email already exists"
            });
        }

        res.status(400).json({
            error: error.message
        });
    }
});

// DELETE CONTACT
app.delete("/contacts/:id", async (req, res) => {
    try {
        const contact = await Contact.findOneAndDelete({
            contactId: req.params.id
        });

        if (!contact) {
            return res.status(404).json({
                error: "Contact not found"
            });
        }

        res.json({
            message: "Contact deleted successfully",
            contact
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});