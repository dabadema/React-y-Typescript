import { transporter } from '../config/nodemailer';

interface IEmail {
    email: string;
    name: string;
    token: string;
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: IEmail) => {
        const info = await transporter.sendMail({
            from: 'UpTask <noreply@uptask.com>',
            to: user.email,
            subject: 'UpTask - Confirm your email',
            text: `Please confirm your email by clicking here: ${user.token}`,
            html: `<p>Hi ${user.name}, your account in UpTask has been created, everything is about to be ready, just waiting for your confirmation! </p>
            <p> Visit the following link to confirm your email: <a href="${process.env.FRONTEND_URL}/confirm/${user.token}">Confirm account</a></p>
            <p> and introduce the code: <b>${user.token}</b> to complete the process.</p>
            <p> This token will expire in 10 minutes.</p>`,
        });

        console.log('Email sent', info.messageId);
    };
}
