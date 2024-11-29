require('dotenv').config();

const {transporter} = require('../services/emailService')

const fs = require('fs');
const path = require('path');

const createEmailTemplateFromFile = (code, htmlFile, name="") => {
    const templatePath = path.join(__dirname, `../templates/${htmlFile}.html`);
    let template = fs.readFileSync(templatePath, 'utf8');

    if (template.includes('{{ name }}')) {
        template = template.replace('{{ name }}', name);
    }
    template = template.replace('{{ verificationCode }}', code);
    template = template.replace('{{ WebsiteName }}', process.env.APP);

    return template;
};

const sendEmail = async (to, subject, name, code, htmlFile) => {
    const html = createEmailTemplateFromFile(code, htmlFile, name)
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Server Error.'); 
    }
};

module.exports = { sendEmail };