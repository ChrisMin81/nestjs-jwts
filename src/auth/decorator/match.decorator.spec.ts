import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';

import { Match } from './match.decorator';

class TestClassUsingCustomMessage {
  value1: string;

  @Match(TestClassUsingCustomMessage, (c) => c.value1, {
    message: 'Values need to match with custom message',
  })
  value2: string;
}

class TestClassUsingDefaultMessage {
  value1: string;

  @Match(TestClassUsingDefaultMessage, (c) => c.value1)
  value2: string;
}

export function stringified(errors: ValidationError[]): string {
  return JSON.stringify(errors);
}

describe('Match Decorator', () => {
  describe('TestClassUsingCustomMessage', () => {
    it('should PASS on valid DTO', async () => {
      const dto: TestClassUsingCustomMessage = plainToInstance(
        TestClassUsingCustomMessage,
        {
          value1: 'testValue',
          value2: 'testValue',
        },
      );
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should FAIL on invalid DTO', async () => {
      const dto: TestClassUsingCustomMessage = plainToInstance(
        TestClassUsingCustomMessage,
        {
          value1: 'testValue',
          value2: 'other testValue',
        },
      );
      const errors = await validate(dto);
      expect(errors.length).toBe(1);
      expect(stringified(errors)).toContain(
        `Values need to match with custom message`,
      );
    });
  });

  describe('TestClassUsingDefaultMessage', () => {
    it('should PASS on valid DTO', async () => {
      const dto: TestClassUsingDefaultMessage = plainToInstance(
        TestClassUsingDefaultMessage,
        {
          value1: 'testValue',
          value2: 'testValue',
        },
      );
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should FAIL on invalid DTO', async () => {
      const dto: TestClassUsingDefaultMessage = plainToInstance(
        TestClassUsingDefaultMessage,
        {
          value1: 'testValue',
          value2: 'other testValue',
        },
      );
      const errors = await validate(dto);
      expect(errors.length).toBe(1);
      expect(stringified(errors)).toContain(`Values need to match`);
    });
  });
});
