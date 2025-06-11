import nodemailer from 'nodemailer';

export async function sendBookingEmail(name: string, email: string, message: string) {
  if (!name || !email || !email.includes('@') || !message) {
    throw new Error('Missing or invalid booking data.');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const ownerMail = {
    from: `"Ezell Brown" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    subject: 'New Booking Request',
    text: `You have a new booking request:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `
      <h2>New Booking Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
    `,
  };

  const confirmationMail = {
    from: `"Ezell Brown" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'We received your booking request!',
    text: `Hi ${name},\n\nThanks for reaching out to book Ezell for your event. We've received your message and will get back to you shortly.\n\nBest,\nEzell Brown`,
    html: `
      <p>Hi ${name},</p>
      <p>Thanks for reaching out to <strong>book Ezell</strong> for your event. We've received your message and will get back to you shortly.</p>
      <p><em>Here’s what you submitted:</em></p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      <br/>
      <p>Best,<br/>Ezell Brown</p>
    `,
  };

  // Send both emails in parallel
  await Promise.all([
    transporter.sendMail(ownerMail),
    transporter.sendMail(confirmationMail),
  ]);
}
