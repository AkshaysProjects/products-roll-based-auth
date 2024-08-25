import { ChangeStatus } from "../models/PendingChange";
import type { IUser } from "../models/User";
import changeRepository from "../repositories/change.repository";

const getUserDetails = async (user: IUser) => {
	const changes = await changeRepository.findAllChanges(user._id, user.role);
	const pendingChanges = changes.filter(
		(change) => change.status === ChangeStatus.PENDING,
	).length;
	const approvedChanges = changes.filter(
		(change) => change.status === ChangeStatus.APPROVED,
	).length;
	const rejectedChanges = changes.filter(
		(change) => change.status === ChangeStatus.REJECTED,
	).length;

	return {
		pendingChanges,
		approvedChanges,
		rejectedChanges,
	};
};

export default { getUserDetails };
