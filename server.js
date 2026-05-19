require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const path = require('path');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// =========================
// MongoDB Connection
// =========================

mongoose.connect(process.env.MONGO_URI)
.then(() => 
    console.log(process.env.MONGO_URI),
    console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Error:', err));


// =========================
// Reservation Schema
// =========================

const reservationSchema = new mongoose.Schema({
    name: String,
    email: String,
    date: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Reservation = mongoose.model('Reservation', reservationSchema);


// =========================
// Contact Schema
// =========================

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model('Contact', contactSchema);


// =========================
// Email Transporter
// =========================

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// test email connection (IMPORTANT DEBUG)
transporter.verify((error, success) => {
    if (error) {
        console.log('Email Error:', error);
    } else {
        console.log('Email Server Ready');
    }
});


// =========================
// Reservation Route
// =========================

app.post('/api/reservation', async (req, res) => {
    try {

        const reservation = new Reservation(req.body);
        await reservation.save();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.OWNER_EMAIL,
            subject: 'New Reservation',
            html: `
                <h2>New Reservation</h2>
                <p><strong>Name:</strong> ${req.body.name}</p>
                <p><strong>Email:</strong> ${req.body.email}</p>
                <p><strong>Date:</strong> ${req.body.date}</p>
                <p><strong>Message:</strong> ${req.body.message}</p>
            `
        });

        res.json({ success: true, message: 'Reservation Submitted Successfully' });

    } catch (error) {
        console.log('Reservation Error:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});


// =========================
// Contact Route
// =========================

app.post('/api/contact', async (req, res) => {
    try {

        const contact = new Contact(req.body);
        await contact.save();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.OWNER_EMAIL,
            subject: 'New Contact Message',
            html: `
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> ${req.body.name}</p>
                <p><strong>Email:</strong> ${req.body.email}</p>
                <p><strong>Message:</strong> ${req.body.message}</p>
            `
        });

        res.json({ success: true, message: 'Message Sent Successfully' });

    } catch (error) {
        console.log('Contact Error:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});


// =========================
// Server
// =========================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


