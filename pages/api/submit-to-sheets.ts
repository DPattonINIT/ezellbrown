import type { NextApiRequest, NextApiResponse } from 'next';
import { submitToSheets } from '@/utils/submit-to-sheets';

type ResponseData = {
  success?: boolean;
  message?: string;
  error?: string;
  details?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('API route called: /api/submit-to-sheets');
    console.log('Request body:', req.body);
    
    const { name, email } = req.body;

    if (!name || !email) {
      console.error('Missing required fields');
      return res.status(400).json({ error: 'Missing required fields: name and email' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('Invalid email format:', email);
      return res.status(400).json({ error: 'Invalid email format' });
    }

    console.log('Calling submitToSheets with:', { name, email });
    await submitToSheets(name, email);
    console.log('Successfully submitted to sheets');

    return res.status(200).json({ success: true, message: 'Submission successful' });
  } catch (error) {
  console.error('Error handling form submission:', error);

  const errorMessage = error instanceof Error ? error.message : 'Unknown error';

  return res.status(500).json({ 
    error: 'Internal Server Error',
    details: errorMessage,
  });
}

}