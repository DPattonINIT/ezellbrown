// import type { NextApiRequest, NextApiResponse } from 'next';
// import { submitToSheets } from '@/utils/submit-to-sheets';

// type ResponseData = {
//   success?: boolean;
//   message?: string;
//   error?: string;
//   details?: string;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   // Only allow POST method
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   try {
//     console.log('API route called: /api/submit-to-sheets');
//     console.log('Request body:', req.body);
    
//     const { name, email } = req.body;

//     if (!name || !email) {
//       console.error('Missing required fields');
//       return res.status(400).json({ error: 'Missing required fields: name and email' });
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       console.error('Invalid email format:', email);
//       return res.status(400).json({ error: 'Invalid email format' });
//     }

//     console.log('Calling submitToSheets with:', { name, email });
//     await submitToSheets(name, email);
//     console.log('Successfully submitted to sheets');

//     return res.status(200).json({ success: true, message: 'Submission successful' });
//   } catch (error) {
//   console.error('Error handling form submission:', error);

//   const errorMessage = error instanceof Error ? error.message : 'Unknown error';

//   return res.status(500).json({ 
//     error: 'Internal Server Error',
//     details: errorMessage,
//   });
// }

// }

// ==============================================================================================

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

  // Use regular environment variables (not NEXT_PUBLIC_)
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  console.log('SMTP User:', smtpUser ? 'SET' : 'NOT SET');
  console.log('SMTP Pass:', smtpPass ? 'SET' : 'NOT SET');

  if (!smtpUser || !smtpPass) {
    console.error('Missing SMTP credentials');
    return res.status(500).json({ error: 'SMTP credentials are not set' });
  }

  try {
    // Try Google Sheets first
    console.log('Attempting to submit to Google Sheets...');
    await submitToSheets(name, email);
    console.log('Google Sheets submission successful');

    // Try email second
    console.log('Setting up email transporter...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    console.log('Sending notification email...');
    await transporter.sendMail({
      from: `"Ezell Brown" <${smtpUser}>`,
      to: smtpUser,
      subject: 'New Mailing List Subscriber',
      html: `<p><strong>New subscriber:</strong></p><p>Name: ${name}</p><p>Email: ${email}</p>`,
    });
    console.log('Email sent successfully');

    return res.status(200).json({ message: 'Submission successful' });
  } catch (error) {
    console.error('Detailed error:', error);
    return res.status(500).json({ 
      error: 'Submission failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}