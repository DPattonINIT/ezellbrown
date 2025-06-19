// import { google } from 'googleapis';
// import { JWT } from 'google-auth-library';

// export async function submitToSheets(

//   name: string,
//   email: string,
//   message: string = '',
//   type: 'mailing' | 'booking' = 'booking'
// ) {
//   try {
//     const privateKey = process.env.PRIVATE_KEY;
//     const clientEmail = process.env.CLIENT_EMAIL;
//     const projectId = process.env.PROJECT_ID;

//     if (!privateKey || !clientEmail || !projectId) {
//       throw new Error('Missing required Google service account credentials');
//     }

//     const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');

//     const client = new JWT({
//       email: clientEmail,
//       key: formattedPrivateKey,
//       scopes: ['https://www.googleapis.com/auth/spreadsheets'],
//     });

//     const sheets = google.sheets('v4');
//     const spreadsheetId = process.env.GOOGLE_SHEET_ID;
//     const range = 'Sheet1!A:E'; 
//     const timestamp = new Date().toISOString();

//     await sheets.spreadsheets.values.append({
//       auth: client,
//       spreadsheetId,
//       range,
//       valueInputOption: 'USER_ENTERED',
//       requestBody: {
//         values: [[name, email, timestamp, message, type]],
//       },
//     });

//     console.log('Successfully added to sheet:', { name, email, message, type });
//   } catch (error) {
//     console.error('submitToSheets error:', error);
//     throw error;
//   }
// }


// =========================================================================
// utils/submit-to-sheets.ts
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

export async function submitToSheets(
  name: string,
  email: string,
  message: string = '',
  type: 'mailing' | 'booking' = 'booking'
) {
  try {
    const privateKey = process.env.PRIVATE_KEY;
    const clientEmail = process.env.CLIENT_EMAIL;
    const projectId = process.env.PROJECT_ID;

    if (!privateKey || !clientEmail || !projectId) {
      throw new Error('Missing required Google service account credentials');
    }

    const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');

    const client = new JWT({
      email: clientEmail,
      key: formattedPrivateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets('v4');

    // Select the correct spreadsheet based on type
    const spreadsheetId =
      type === 'mailing'
        ? process.env.GOOGLE_SHEET_ID_MAILING
        : process.env.GOOGLE_SHEET_ID_BOOKING;

    if (!spreadsheetId) {
      throw new Error('Missing Google Spreadsheet ID for the submission type');
    }

    const range = 'Sheet1!A:E'; // Assumes columns: Name, Email, Timestamp, Message, Type
    const timestamp = new Date().toISOString();

    await sheets.spreadsheets.values.append({
      auth: client,
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[name, email, timestamp, message, type]],
      },
    });

    console.log('Successfully added to sheet:', { name, email, message, type });
  } catch (error) {
    console.error('submitToSheets error:', error);
    throw error;
  }
}
