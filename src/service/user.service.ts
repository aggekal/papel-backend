import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import userModel, {
  UpdateUserPassword,
  UserDocument,
} from "../models/user.model";
import { omit } from "lodash";

export async function createUser(
  input: DocumentDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) {
  try {
    const user = await userModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await userModel.findOne({ email });
  if (!user) {
    return false;
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) return false;
  return omit(user.toJSON(), "password");
}

export async function validatePasswordWithUsername({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const user = await userModel.findOne({ username });
  if (!user) {
    return false;
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) return false;
  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return userModel.findOne(query).lean();
}

export async function updateUserPassword(
  query: FilterQuery<UpdateUserPassword>,
  update: UpdateQuery<UpdateUserPassword>,
  options: QueryOptions
) {
  return userModel.findOneAndUpdate(
    { _id: query.userId },
    { password: update.password },
    options
  );
}
