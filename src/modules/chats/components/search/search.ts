import Block from '../../../../scripts/block/block';
import { Props } from '../../../../scripts/dto/types';
import { debounce } from '../../../../scripts/globalFunctions';

const tmpl: string = `form.contacts__search__form
  label
    input.contacts__search__input(type="text" placeholder="Search" name="search")`;

export default class Search extends Block {
  constructor(props: Props) {
    super({
      tagName: 'li',
      classList: 'contacts__item contacts__search'
    }, tmpl, {
      ...props,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
        }
      }
    });

    this.getContent().querySelector('.contacts__search__input')!.addEventListener('input', debounce((e: Event): void => {
      const target: HTMLInputElement = e.target as HTMLInputElement;
      props.contacts.setProps({ search: target.value });
    }, 500) as EventListener);
  }
}