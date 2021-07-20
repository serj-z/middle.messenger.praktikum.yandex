import Block from "./block/block";
import { MakeValidator, PassTypes, ValidationRule, Validator } from "./dto/types";

export default class Validation {
  invalidFields: Array<string> = [];
  private password: string = '';
  inputsContainer: string;
  messageContainer: string;

  constructor(inputsContainer: string, messageContainer: string) {
    this.inputsContainer = inputsContainer;
    this.messageContainer = messageContainer;
  }


  private composeValidator: (rule: ValidationRule, msg: string) => Validator = (rule, msg) => {
    return val => !rule(val) ? msg : '';
  };

  private validateRequired: ValidationRule = val => val.trim().length > 0;
  private validateEmail: ValidationRule = val => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val);
  private validateUsername: ValidationRule = val => /^[A-Za-z0-9_-]*$/.test(val);
  private validatePhone: ValidationRule = val => /^(?=.*[0-9])([0-9\(\)\/\+ \-]*)$/.test(val);
  private validateMinLength: (min: number) => ValidationRule = min => val => val.length >= min;
  private validatePassword: (type: PassTypes) => ValidationRule = type => val => {
    if (type === PassTypes.pass) this.password = val;
    return /^\S*$/.test(val);
  };
  private validateConfirmPassword: ValidationRule = val => val === this.password;
  private validateOldPassword: ValidationRule = val => val !== this.password;


  isRequired: MakeValidator = (msg = 'Required') => this.composeValidator(this.validateRequired, msg);
  isEmail: MakeValidator = (msg = 'Valid Email Required') => this.composeValidator(this.validateEmail, msg);
  isUsername: MakeValidator = (msg = 'Can contain only latin letters, numbers, underscores or hyphens') => this.composeValidator(this.validateUsername, msg);
  isPhone: MakeValidator = (msg = 'Valid Phone number Required') => this.composeValidator(this.validatePhone, msg);
  isMinLength: MakeValidator = (msg, min: number) =>
    this.composeValidator(this.validateMinLength(min), msg || `At least ${min} characters required`);
  isPassword: MakeValidator = (msg, type: PassTypes) =>
    this.composeValidator(this.validatePassword(type), msg || 'Password must not contain whitespaces');
  isConfirmPassword: MakeValidator = (msg = 'Password confirmation doesn\'t match') => this.composeValidator(this.validateConfirmPassword, msg);
  isOldPassword: MakeValidator = (msg = 'New password can\'t be the same as the old one') => this.composeValidator(this.validateOldPassword, msg);


  validateField = (field: HTMLInputElement, component: Block): void => {
    if(field.tagName !== 'input') field = field.querySelector('input')!;
    if(!field) return;
    const label: string = component.props.label;
    const rules: Array<Validator> = component.props.rules;
    if(!rules?.length) return;

    let errors: Array<string> = [];
    rules.forEach((rule) => {
      const error: string = rule(field.value);
      if (error) errors.push(error);
    });
    const index: number = this.invalidFields.indexOf(label);
    if (errors.length && index === -1) {
      this.invalidFields.push(label);
    } else if (!errors.length && index > -1) {
      this.invalidFields.splice(index, 1);
    }
    component.children?.[this.messageContainer][0].setProps({text: errors.join('\n')});
  };

  validateForm = (form: Block): string => {
    form.children[this.inputsContainer].forEach((input: Block)=>{
      this.validateField(input.getContent() as HTMLInputElement, input);
    });
    
    return this.invalidFields.length ?
      `Following fields require revision: ${this.invalidFields.join(', ')}.` :
      '';
  };
}