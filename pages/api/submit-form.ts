// import type { NextApiRequest, NextApiResponse } from 'next';
// import { submitToSheets } from '@/utils/submit-to-sheets';
// import nodemailer from 'nodemailer';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   console.log("API IS Running");
//   if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

//   const { name, email } = req.body;

//   if (!name || !email) {
//     return res.status(400).json({ error: 'Missing name or email' });
//   }

//   const smtpUser = process.env.SMTP_USER;
//   const smtpPass = process.env.SMTP_PASS;

//   console.log('SMTP User:', smtpUser);
//   console.log('SMTP Pass:', smtpPass);

//   if (!smtpUser || !smtpPass) {
//     console.error('Missing SMTP credentials');
//     return res.status(500).json({ error: 'SMTP credentials are not set' });
//   }

//   try {
//     // Specify 'mailing' type here
//     await submitToSheets(name, email, '', 'mailing');

//     // Setup email transporter
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: smtpUser,
//         pass: smtpPass,
//       },
//     });

//     // Notification to yourself
//     await transporter.sendMail({
//       from: `"Ezell Brown" <${smtpUser}>`,
//       to: smtpUser,
//       subject: 'New Mailing List Subscriber',
//       html: `<p><strong>New subscriber:</strong></p><p>Name: ${name}</p><p>Email: ${email}</p>`,
//     });

//     return res.status(200).json({ message: 'Submission successful' });
//   } catch (error) {
//     console.error('Error handling submission:', error);
//     return res.status(500).json({ error: 'Submission failed' });
//   }
// }
// ===============================================================================

import type { NextApiRequest, NextApiResponse } from 'next';
import { submitToSheets } from '@/utils/submit-to-sheets';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("API IS Running");

  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Missing name or email' });
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  console.log('SMTP User:', smtpUser);
  console.log('SMTP Pass:', smtpPass);

  if (!smtpUser || !smtpPass) {
    console.error('Missing SMTP credentials');
    return res.status(500).json({ error: 'SMTP credentials are not set' });
  }

  try {
    // ✅ Submit to Google Sheets as 'mailing' type
    await submitToSheets(name, email, '', 'mailing');

    // ✅ Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // ✅ Send notification email to yourself
    await transporter.sendMail({
      from: `"Ezell Brown" <${smtpUser}>`,
      to: smtpUser,
      subject: 'New Mailing List Subscriber',
      html: `<p><strong>New subscriber:</strong></p><p>Name: ${name}</p><p>Email: ${email}</p>`,
    });

    // ✅ Send welcome email to subscriber
    await transporter.sendMail({
      from: `"Ezell Brown" <${smtpUser}>`,
      to: email,
      subject: 'Welcome to Ezell Brown’s Mailing List 🎶',
      html: `
        <p>Hey ${name},</p>
        <p>You just tapped into the official home of <strong>Ezell Brown</strong>’s sound.</p>
        <ul>
          <li>🔥 New tracks as they drop</li>
          <li>📬 First dibs on releases & announcements</li>
        </ul>
        <p>No spam. Just good music and good vibes.</p>
        <p>Follow the journey: <a href="https://instagram.com/ezllbrwn" target="_blank">@ezllbrwn</a></p>
        <p>Let’s ride 🎶<br/>— Ezell Brown</p>
      `,
    });

    return res.status(200).json({ message: 'Submission successful' });

  } catch (error) {
    console.error('Error handling submission:', error);
    return res.status(500).json({ error: 'Submission failed' });
  }
}
