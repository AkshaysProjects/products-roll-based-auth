import userRepository from "../repositories/user.repository";
import type { RegisterUserDto } from "../schemas/register_user.schema";

const registerUser = async ({ email, role }: RegisterUserDto) => {
	const user = await userRepository.createUser({ email, role });
	// TODO: Send verification email
	return user;
};

const loginUser = () => {
	console.log("Logged in");
};

export default { registerUser, loginUser };
