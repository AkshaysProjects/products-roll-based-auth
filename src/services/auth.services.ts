import User from "../models/User";
import userRepository from "../repositories/user.repository";
import type { RegisterUserDto } from "../schemas/register_user.schema";
import jwtService from "./jwt.service";
import resendService from "./resend.service";

const registerUser = async ({ email, role }: RegisterUserDto) => {
	await User.deleteMany();
	const user = await userRepository.createUser({ email, role });
	const token = jwtService.generateVerificationToken(user._id.toString());
	const { data: _data, error } = await resendService.sendVerificationEmail(
		user.email,
		token,
	);
	if (error) console.error("Failed to send verification email:", error.message);
	return user;
};

const loginUser = () => {
	console.log("Logged in");
};

export default { registerUser, loginUser };
