export * from './debugger';

export const appendArrayWithNewOnly = <T extends { id: string }>(
  oldArray: T[],
  newArray: T[]
) => {
  const oldIds = oldArray.map((item) => item.id);
  const newItems = newArray.filter((item) => !oldIds.includes(item.id));
  return [...oldArray, ...newItems];
};
