import PendingChange, {
	ChangeStatus,
	type IPendingChange,
} from "../models/PendingChange";
import type { ObjectId } from "../types";

const findPendingChangesByUser = async (userId: ObjectId) => {
	return PendingChange.find({
		user: userId,
		status: ChangeStatus.PENDING,
	})
		.populate("product")
		.lean();
};

const findAllPendingChanges = async () => {
	return PendingChange.find({ status: ChangeStatus.PENDING })
		.populate("product")
		.lean();
};

const findPendingChangeById = async (id: string) => {
	return PendingChange.findById(id).lean();
};

const findByIdAndUpdate = async (id: string, data: Partial<IPendingChange>) => {
	return PendingChange.findByIdAndUpdate(id, data, {
		new: true,
	}).lean();
};

export default {
	findPendingChangesByUser,
	findByIdAndUpdate,
	findAllPendingChanges,
	findPendingChangeById,
};
