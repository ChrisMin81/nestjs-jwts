import { inclusivePick, pick } from './pick.helper';

describe('pick and inclusivePick helper', () => {
  describe('function pick', () => {
    it('should return an object with only the picked property', () => {
      const obj = {
        name: 'Chris',
        age: 42,
        height: 1.76,
      };
      const result = pick(obj, 'age');
      expect(result).toHaveProperty('age');
      expect(result).not.toHaveProperty('name');
      expect(result).not.toHaveProperty('height');
    });
  });

  describe('function inclusivePick', () => {
    it('should return an object with the picked and the additional property', () => {
      const obj = {
        name: 'Chris',
        age: 42,
        height: 1.76,
      };
      const result = inclusivePick(obj, 'age', 'password');
      expect(result).toHaveProperty('age');
      expect(result).toHaveProperty('password');
      expect(result).not.toHaveProperty('name');
      expect(result).not.toHaveProperty('height');
    });
  });
});
