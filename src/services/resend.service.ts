import { Resend } from "resend";
import { env } from "../env";
import { loginEmailTemplate } from "../templates/login";
import { verificationEmailTemplate } from "../templates/verify";

const resend = new Resend(env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
	const verificationLink = `${env.BASE_URL}/api/auth/verify?token=${token}`;

	return resend.emails.send({
		from: "Akshay Kakatkar <no-reply@akshaykakatkar.tech>",
		to: [email],
		subject: "Verify your email address",
		html: verificationEmailTemplate(verificationLink),
	});
};

export const sendLoginEmail = async (email: string, token: string) => {
	const loginLink = `${env.BASE_URL}/login?token=${token}`;

	return resend.emails.send({
		from: "Akshay Kakatkar <no-reply@akshaykakatkar.tech>",
		to: [email],
		subject: "Login to your account",
		html: loginEmailTemplate(loginLink),
	});
};

export default { sendVerificationEmail, sendLoginEmail };
