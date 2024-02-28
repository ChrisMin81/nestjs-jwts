import { ClassConstructor } from 'class-transformer';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

type Tfn<T> = (o: T) => any;

export const Match = <T>(
  type: ClassConstructor<T>,
  property: Tfn<T>,
  validationOptions?: ValidationOptions,
) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint<T>,
    });
  };
};

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint<T> implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [fn] = args.constraints as Tfn<T>[];
    return fn(args.object as T) === value;
  }

  defaultMessage(): string {
    return `Values need to match!`;
  }
}
