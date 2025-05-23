
import type { NextApiRequest, NextApiResponse } from 'next';
import { submitToSheets } from '@/utils/submit-to-sheets';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Missing name or email' });
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    console.error('Missing SMTP credentials');
    return res.status(500).json({ error: 'SMTP credentials are not set' });
  }

  try {
    // Submit to Google Sheets
    await submitToSheets(name, email);

    // Setup email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Welcome email to user
    // await transporter.sendMail({
    //   from: `"Ezell Brown" <${smtpUser}>`,
    //   to: email,
    //   subject: 'Welcome to Our Email List!',
    //   html: `<p>Hi ${name},</p><p>Thanks for signing up for our mailing list!</p>`,
    // });

    // Notification to yourself
    await transporter.sendMail({
      from: `"Ezell Brown" <${smtpUser}>`,
      to: smtpUser,
      subject: 'New Mailing List Subscriber',
      html: `<p><strong>New subscriber:</strong></p><p>Name: ${name}</p><p>Email: ${email}</p>`,
    });

    return res.status(200).json({ message: 'Submission successful' });
  } catch (error) {
    console.error('Error handling submission:', error);
    return res.status(500).json({ error: 'Submission failed' });
  }
}
