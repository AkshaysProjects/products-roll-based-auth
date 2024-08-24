import { Resend } from "resend";
import { env } from "../env";
import { verificationEmailTemplate } from "../templates/verify";

const resend = new Resend(env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
	const verificationLink = `${env.BASE_URL}/api/auth/verify/${token}`;

	return resend.emails.send({
		from: "Akshay Kakatkar <no-reply@akshaykakatkar.tech>",
		to: [email],
		subject: "Verify your email address",
		html: verificationEmailTemplate(verificationLink),
	});
};

export default { sendVerificationEmail };
