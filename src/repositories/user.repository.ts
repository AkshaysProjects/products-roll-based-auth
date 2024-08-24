import User, { type IUser } from "../models/User";

const createUser = async (user: Partial<IUser>) => {
	return User.create(user);
};

const findUserById = async (id: string) => {
	return User.findById(id);
};

const findByIdAndUpdate = async (id: string, data: Partial<IUser>) => {
	return User.findByIdAndUpdate(id, data, { new: true });
};

const findUserByEmail = async (email: string) => {
	return User.findOne({ email });
};

export default { createUser, findUserById, findByIdAndUpdate, findUserByEmail };
