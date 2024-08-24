import User from "../models/User";
import type { RegisterUserDto } from "../schemas/register_user.schema";

const registerUser = async ({ email, role }: RegisterUserDto) => {
	const user = await User.create({ email, role });
	// TODO: Send verification email
	return user;
};

const loginUser = () => {
	console.log("Logged in");
};

export default { registerUser, loginUser };
