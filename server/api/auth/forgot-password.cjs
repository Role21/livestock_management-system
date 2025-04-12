// server/api/auth/forgot-password.cjs
const { defineEventHandler, readBody } = require('h3');
const db = require('../../utils/db.cjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

module.exports = defineEventHandler(async (event) => {
  const { email } = await readBody(event);

  // Check if email exists
  const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  if (users.length === 0) {
    return { error: 'No account with that email exists' };
  }

  const user = users[0];

  // Generate reset token and expiration
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetExpires = new Date(Date.now() + 3600000); // 1 hour

  // Store token and expiration in DB
  await db.query(
    'UPDATE users SET resetToken = ?, resetExpires = ? WHERE id = ?',
    [resetToken, resetExpires, user.id]
  );

  // Send email (configure for real SMTP in production)
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Replace with your SMTP host
    port: 587,
    secure: false,
    auth: {
      user: 'your_email@example.com', // Replace with your email
      pass: 'your_email_password',    // Replace with your password
    },
  });

  const resetUrl = `http://localhost:3000/auth/resetPassword?token=${resetToken}`;

  await transporter.sendMail({
    from: '"Your App" <no-reply@example.com>',
    to: email,
    subject: 'Password Reset',
    html: `
      <p>Hello ${user.name || user.email},</p>
      <p>You requested to reset your password.</p>
      <p>Click the link below to set a new password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link will expire in 1 hour.</p>
    `,
  });

  return { message: 'Reset link sent to your email.' };
});
