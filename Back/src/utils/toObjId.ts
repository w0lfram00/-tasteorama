import { Types } from 'mongoose';

export const toObjId = (id: string | undefined) => {
  if (typeof id === 'undefined') return;
  return new Types.ObjectId(id);
};
