// import { google } from 'googleapis';
// import { JWT } from 'google-auth-library';
// import path from 'path';
// import fs from 'fs';

// export async function submitToSheets(name: string, email: string) {
//   try {
//     console.log('Starting submitToSheets function');
    
//     const keyFilePath = path.join(process.cwd(), 'google-service-account.json');
//     console.log('Service account path:', keyFilePath);
    
//     if (!fs.existsSync(keyFilePath)) {
//       throw new Error(`Service account file not found at: ${keyFilePath}`);
//     }
    
//     const keyFile = fs.readFileSync(keyFilePath, 'utf-8');
//     const credentials = JSON.parse(keyFile);

//     const client = new JWT({
//       email: credentials.client_email,
//       key: credentials.private_key,
//       scopes: ['https://www.googleapis.com/auth/spreadsheets'],
//     });

//     const sheets = google.sheets('v4');
//     const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    
//     if (!spreadsheetId) {
//       console.error('Missing GOOGLE_SHEET_ID in environment variables');
//       throw new Error('GOOGLE_SHEET_ID is not defined in environment variables');
//     }
    
//     console.log('Using spreadsheet ID:', spreadsheetId);
//     const timestamp = new Date().toISOString();
//     const range = 'Sheet1!A:C';

//     console.log('Appending to sheet with data:', { name, email, timestamp });
    
//     await sheets.spreadsheets.values.append({
//       auth: client,
//       spreadsheetId,
//       range,
//       valueInputOption: 'USER_ENTERED',
//       requestBody: {
//         values: [[name, email, timestamp]],
//       },
//     });
    
//     console.log('Data successfully submitted to Google Sheets');
//   } catch (error) {
//     console.error('Error in submitToSheets function:', error);
//     throw error; // Re-throw the error so it's caught in the API handler
//   }
// }
// =============================================================================================


import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

export async function submitToSheets(name: string, email: string) {
  try {
    console.log('Starting submitToSheets function');
    
    // Get credentials from environment variables instead of file
    const privateKey = process.env.PRIVATE_KEY;
    const clientEmail = process.env.CLIENT_EMAIL;
    const projectId = process.env.PROJECT_ID;
    
    if (!privateKey || !clientEmail || !projectId) {
      console.error('Missing Google service account credentials in environment variables');
      throw new Error('Missing required environment variables: PRIVATE_KEY, CLIENT_EMAIL, or PROJECT_ID');
    }
    
    console.log('Using client email:', clientEmail);
    
    // Replace \\n with actual newlines in the private key
    const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');
    
    const client = new JWT({
      email: clientEmail,
      key: formattedPrivateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets('v4');
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    
    if (!spreadsheetId) {
      console.error('Missing GOOGLE_SHEET_ID in environment variables');
      throw new Error('GOOGLE_SHEET_ID is not defined in environment variables');
    }
    
    console.log('Using spreadsheet ID:', spreadsheetId);
    const timestamp = new Date().toISOString();
    const range = 'Sheet1!A:C';

    console.log('Appending to sheet with data:', { name, email, timestamp });
    
    await sheets.spreadsheets.values.append({
      auth: client,
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[name, email, timestamp]],
      },
    });
    
    console.log('Data successfully submitted to Google Sheets');
  } catch (error) {
    console.error('Error in submitToSheets function:', error);
    throw error; // Re-throw the error so it's caught in the API handler
  }
}