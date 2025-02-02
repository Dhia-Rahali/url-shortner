import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments,ValidationOptions,registerDecorator } from 'class-validator';


@ValidatorConstraint({ name: 'IsUrl', async: false })
export class IsUrlValidator implements ValidatorConstraintInterface {
  validate(url: string, args: ValidationArguments) {
    // Custom URL validation logic
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return !!urlRegex.test(url);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid URL format. Please enter a valid website URL';
  }
}


export function IsUrl(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'IsUrl',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: IsUrlValidator,
      });
    };
  }