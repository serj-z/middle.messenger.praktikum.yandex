import Block from '../../../../scripts/block';
import tmpl from './template.pug';

export default class DeleteChat extends Block {
  constructor() {
    super({
      tagName: 'form'
    }, tmpl);
  }
}