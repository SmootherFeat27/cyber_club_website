require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Add coordinator emails here
const COORDINATOR_EMAILS = [
    process.env.SYSTEM_EMAIL // Temporarily uses your email for testing
];

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SYSTEM_EMAIL,
        pass: process.env.SYSTEM_PASSWORD
    },
    tls: { ciphers: 'SSLv3' }
});

app.post('/api/grievance/submit', async (req, res) => {
    const { category, message } = req.body;

    if (!category || !message) {
        return res.status(400).json({ success: false, error: 'Category and message are required.' });
    }

    const mailOptions = {
        from: `"UniShield Portal" <${process.env.SYSTEM_EMAIL}>`,
        to: COORDINATOR_EMAILS.join(','),
        subject: `[PAN-UNI GRIEVANCE] New Ticket: ${category.toUpperCase()}`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #CBD5E1; border-radius: 8px;">
                <h2 style="color: #0F172A;">Pan-University Grievance Notification</h2>
                <p><strong>Category:</strong> ${category}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
                <hr />
                <p><strong>Ticket Details:</strong></p>
                <blockquote style="background: #F8FAFC; padding: 12px; border-left: 4px solid #2563EB;">
                    ${message.replace(/\n/g, '<br>')}
                </blockquote>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: 'Ticket routed to coordinators.' });
    } catch (error) {
        console.error('Mail Error:', error);
        return res.status(500).json({ success: false, error: 'Failed to send email.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server active on port ${PORT}`));
