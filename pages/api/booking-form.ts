import type { NextApiRequest, NextApiResponse } from 'next';
import { submitToSheets } from '../../utils/submit-to-sheets';
import { sendBookingEmail } from '../../utils/send-booking-email';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const { name, email, message } = req.body;
    console.log('[Booking] Received:', { name, email, message });

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    console.log('[Booking] Calling submitToSheets...');
    await submitToSheets(name, email, message, 'booking');
    console.log('[Booking] submitToSheets success');

    console.log('[Booking] Sending email notification...');
    await sendBookingEmail(name, email, message);
    console.log('[Booking] Email notification sent');

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('[Booking API error]', error);
    return res.status(500).json({
      error: 'Failed to submit booking',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

