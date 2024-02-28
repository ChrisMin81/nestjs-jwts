/**
 * Fisher-Yates Sorting Algorithm
 *
 * This algorithm's basic premise is to iterate over the items,
 * swapping each element in the array with a randomly selected element
 * from the remaining un-shuffled portion of the array.
 * */
export const shuffle = <TData>(array: TData[]): TData[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
