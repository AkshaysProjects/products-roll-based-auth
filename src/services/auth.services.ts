import {
	Conflict,
	InternalServerError,
	NotFound,
	Unauthorized,
} from "@tsed/exceptions";
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
	const { error } = await resendService.sendVerificationEmail(
		user.email,
		token,
	);

	// If there is an error, throw an error
	if (error) throw new InternalServerError("Failed to send verification email");

	// Return the user
	return user;
};

const verifyEmail = async (token: string) => {
	const { userId } = await jwtService.verifyVerificationToken(token);
	const user = await userRepository.findByIdAndUpdate(userId, {
		emailVerified: true,
	});

	if (!user) throw new NotFound("User not found");

	return user;
};

const loginWithEmail = async (email: string) => {
	// Check if the user exists
	const user = await userRepository.findUserByEmail(email);

	// If the user doesn't exist, throw an error
	if (!user) throw new NotFound("User not found");

	// Check if the user is verified
	if (!user.emailVerified) throw new Unauthorized("Email not verified");

	// Generate a login token
	const loginToken = jwtService.generateLoginToken(user._id.toString());

	// Send the login email
	const { error } = await resendService.sendLoginEmail(user.email, loginToken);

	// If there is an error, throw an error
	if (error) throw new InternalServerError("Failed to send login email");

	// Return the user
	return {
		success: true,
		id: user._id.toString(),
		message: `Login magic link send to ${user.email}`,
	};
};

const loginWithToken = async (token: string) => {
	// Verify the login token
	const { userId } = await jwtService.verifyLoginToken(token);

	// Get the user
	const user = await userRepository.findUserById(userId);

	// If the user doesn't exist, throw an error
	if (!user) throw new NotFound("User not found");

	// Return the user
	return user;
};

export default { registerUser, verifyEmail, loginWithEmail, loginWithToken };
