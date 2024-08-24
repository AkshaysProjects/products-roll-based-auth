import { Conflict, InternalServerError } from "ts-httpexceptions";
import userRepository from "../repositories/user.repository";
import type { RegisterUserDto } from "../schemas/register_user.schema";
import jwtService from "./jwt.service";
import resendService from "./resend.service";

const registerUser = async ({ email, role }: RegisterUserDto) => {
	// Check if the user already exists
	const existingUser = await userRepository.findUserByEmail(email);

	// If the user already exists, throw an error
	if (existingUser) throw new Conflict("User already exists");

	// Create the user
	const user = await userRepository.createUser({ email, role });

	// Generate a verification token
	const token = jwtService.generateVerificationToken(user._id.toString());

	// Send the verification email
	const { data: _data, error } = await resendService.sendVerificationEmail(
		user.email,
		token,
	);

	// If there is an error, throw an error
	if (error) throw new InternalServerError("Failed to send verification email");

	// Return the user
	return user;
};

const loginUser = () => {
	console.log("Logged in");
};

export default { registerUser, loginUser };
