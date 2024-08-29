import PendingChange, {
  ChangeStatus,
  type IPendingChange,
} from "../models/PendingChange";
import { UserRole } from "../models/User";
import type { ObjectId } from "../types";

const findAllChanges = async (userId: ObjectId, role: UserRole) => {
  return role === UserRole.MEMBER
    ? PendingChange.find({
        user: userId,
      }).lean()
    : PendingChange.find({
        $or: [{ admin: userId }, { status: ChangeStatus.PENDING }],
      }).lean();
};

const findAll = async () => {
  return PendingChange.find().populate("product updatedProduct").lean();
};

const findAllByUser = async (userId: ObjectId) => {
  return PendingChange.find({ user: userId })
    .populate("product updatedProduct")
    .lean();
};

const findById = async (changeId: string) => {
  return PendingChange.findById(changeId)
    .populate("product updatedProduct")
    .lean();
};

const findPendingChangesByUser = async (userId: ObjectId) => {
  return PendingChange.find({
    user: userId,
    status: ChangeStatus.PENDING,
  })
    .populate("product updatedProduct")
    .lean();
};

const findAllPendingChanges = async () => {
  return PendingChange.find({ status: ChangeStatus.PENDING })
    .populate("product updatedProduct")
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
  findAllChanges,
  findAll,
  findAllByUser,
  findById,
  findPendingChangesByUser,
  findByIdAndUpdate,
  findAllPendingChanges,
  findPendingChangeById,
};
