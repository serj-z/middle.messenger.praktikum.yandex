import Block from '../../../../scripts/block';
import Input from '../../../../components/input/input';
import tmpl from './template.pug';

export default class AddContact extends Block {
  constructor() {
    super({
      tagName: 'form'
    }, tmpl, undefined, {
      input: [new Input({
        label: 'Username',
        type: 'text',
        classList: 'dynamic-label',
        name: 'add-contact'
      })]
    });
  }
}