import { NotFound } from "@tsed/exceptions";
import { omit } from "lodash";
import { ChangeStatus } from "../models/PendingChange";
import { type IUser, UserRole } from "../models/User";
import changeRepository from "../repositories/change.repository";
import productRepository from "../repositories/product.repository";

const getPendingChanges = async (user: IUser) => {
	return user.role === UserRole.ADMIN
		? changeRepository.findAllPendingChanges()
		: changeRepository.findPendingChangesByUser(user._id);
};

const approveChange = async (changeId: string, user: IUser) => {
	const change = await changeRepository.findPendingChangeById(changeId);
	if (!change) throw new NotFound("Invalid change id");
	const pendingProduct = await productRepository.findPendingProductById(
		change.pendingChange,
	);
	if (!pendingProduct) throw new NotFound("Invalid pending product id");
	const product = await productRepository.findByIdAndUpdate(
		change?.product?._id || pendingProduct._id,
		{ ...omit(pendingProduct, ["_id"]) },
	);
	const finalChange = await changeRepository.findByIdAndUpdate(changeId, {
		status: ChangeStatus.APPROVED,
		admin: user._id,
	});
	return { product, change: finalChange };
};

const rejectChange = async (changeId: string, user: IUser) => {
	return changeRepository.findByIdAndUpdate(changeId, {
		status: ChangeStatus.REJECTED,
		admin: user._id,
	});
};

export default { getPendingChanges, approveChange, rejectChange };
