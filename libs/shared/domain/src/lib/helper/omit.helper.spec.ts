// export const omit = <T extends NonNullable<unknown>, K extends keyof T>(obj: T, ...keys: K[]) => (
//   Object.fromEntries(
//         Object.entries(obj)
//       .filter(([key]) => !keys.includes(key as K))
//   ) as Omit<T, K>
// )

import { omit } from './omit.helper';

describe('function omit', () => {
  it('should return an object without the property to omit', () => {
    const obj = {
      name: 'Chris',
      age: 42,
      height: 1.76,
    };
    expect(omit(obj, 'age')).not.toHaveProperty('age');
    expect(omit(obj, 'age')).toHaveProperty('name');
    expect(omit(obj, 'age')).toHaveProperty('height');
  });
});
