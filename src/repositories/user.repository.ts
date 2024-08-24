import User, { type IUser } from "../models/User";

const createUser = async (user: Partial<IUser>) => {
	return User.create(user);
};

const findUserByEmail = async (email: string) => {
	return User.findOne({ email });
};

export default { createUser, findUserByEmail };
