import Block from '../../../../scripts/block';
import { Props } from '../../../../scripts/types';
import tmpl from './template.pug';

export default class Search extends Block {
  constructor(props: Props) {
    super({
      tagName: 'li',
      classList: 'contacts__item contacts__search'
    }, tmpl, props);

    this.getContent().querySelector('.contacts__search__input').addEventListener('input', function (): void {
      props.searchContacts(this.value);
    });
  }
}