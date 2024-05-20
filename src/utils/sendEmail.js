const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD
		}
	});

	const mailOptions = {
		from: 'your-email@example.com',
		to: options.to,
		subject: options.subject,
		text: options.text
	};

	await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;