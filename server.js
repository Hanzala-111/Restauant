require('dotenv').config();
console.log("NEW SERVER CODE RUNNING");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
// const nodemailer = require('nodemailer');
const path = require('path');
dotenv.config();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// =========================
// MongoDB Connection
// =========================

// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log('MongoDB Connected'))
// .catch(err => console.log('MongoDB Error:', err));


const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    })
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




// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     family: 4, // IMPORTANT → forces IPv4
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });


// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });



// test email connection (IMPORTANT DEBUG)
// transporter.verify((error, success) => {
//     if (error) {
//         console.log('Email Error:', error);
//     } else {
//         console.log('Email Server Ready');
//     }
// });


// =========================
// Reservation Route
// =========================

app.post('/api/reservation', async (req, res) => {
    try {
        console.log("Reservation route started");

        const reservation = new Reservation(req.body);

        await reservation.save();
        console.log("Before sending email");

        // await resend.emails.send({
        //     from: 'Restaurant <onboarding@resend.dev>',
        //     to: 'yourgmail@gmail.com',
        //     subject: 'New Reservation',
        //     html: `
        //         <h2>New Reservation</h2>
        //         <p>Name: ${req.body.name}</p>
        //         <p>Email: ${req.body.email}</p>
        //     `
        // });

        const emailResponse = await resend.emails.send({
            from: 'Restaurant <onboarding@resend.dev>',
            to: process.env.OWNER_EMAIL,
            subject: 'New Reservation',
            html: `<h1>Test Email</h1>`
        });

        console.log(emailResponse);
        console.log("After sending email");

        res.status(200).json({
            success: true,
            message: "Reservation submitted"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});


// =========================
// Contact Route
// =========================

app.post('/api/contact', async (req, res) => {

    try {

        // Save message to MongoDB
        const contact = new Contact(req.body);
        await contact.save();

        // Send email using Resend
        await resend.emails.send({
            from: 'Restaurant <onboarding@resend.dev>',
            to: 'marianoori2005@gmail.com' ,
            // to: process.env.OWNER_EMAIL,
            subject: 'New Contact Message',
            html: `
                <h2>New Contact Message</h2>

                <p><strong>Name:</strong> ${req.body.name}</p>

                <p><strong>Email:</strong> ${req.body.email}</p>

                <p><strong>Message:</strong> ${req.body.message}</p>
            `
        });

        res.json({
            success: true,
            message: 'Message Sent Successfully'
        });

    } catch (error) {

        console.log('Contact Error:', error);

        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
});

// console.log(process.env.RESEND_API_KEY);
console.log(process.env.OWNER_EMAIL);


// =========================
// Server
// =========================


// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
