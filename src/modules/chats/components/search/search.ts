import Block from '../../../../scripts/block';
import { Props } from '../../../../scripts/types';

const tmpl: string = `form.contacts__search__form
  label
    input.contacts__search__input(type="text" placeholder="Search" name="search")`;

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