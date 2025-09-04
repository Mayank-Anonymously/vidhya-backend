const nodemailer = require('nodemailer');

const sendEmail = async (email, name, ticketNumber) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		auth: {
			user: 'vidhyaroute@gmail.com',
			pass: 'bqfw wpdu yrzn xsvj', // Use App Password, not Gmail password
		},
	});

	const mailOptions = {
		from: 'Vidhya Route <vidhyaroute@gmail.com>',
		to: email,
		cc: 'vidhyaroute@gmail.com , kunalberia@vidhyaroute.com, souravkumar@vidhyaroute.com ',
		subject: `Vidhyaaroute - Study Abroad Information (Ticket: ${ticketNumber})`,
		html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vidhyaa Route - Study Abroad Enquiry</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }
    .container { max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 10px; }
    h2 { color: #333; }
    p { color: #555; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Thank You for Contacting Vidhyaa Route</h2>
    <p>Hi <strong>${name}</strong>,</p>
    <p>Thanks for reaching out to <strong>Vidhyaa Route</strong> – your trusted guide to a world of opportunities!</p>
    <p>We’ve received your enquiry and your support ticket (<strong>${ticketNumber}</strong>) has been successfully created. Our team is already on it, and one of our education experts will be in touch with you shortly to assist with your goals – whether it’s overseas admission, an education loan, or a study visa.</p>
    <p>At Vidhyaa Route, we believe your dreams deserve a global stage — and we're here to help make that happen.</p>
    <p><strong>Stay tuned, your journey starts now!</strong></p>
    <br>
    <p>Warm wishes,<br>
    <strong>Team Vidhyaa Route</strong><br>
    Paving the way to your global future.</p>
  </div>
</body>
</html>
`,
	};

	await transporter.sendMail(mailOptions); // Throws error if fails
};

module.exports = sendEmail;
