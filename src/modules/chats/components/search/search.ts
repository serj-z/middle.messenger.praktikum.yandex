import Block from '../../../../scripts/block';
import tmpl from './template.pug';

export default class Search extends Block {
  constructor() {
    super({
      tagName: 'li',
      classList: 'contacts__item contacts__search'
    }, tmpl);
  }
}