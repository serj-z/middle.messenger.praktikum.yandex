import Block from '../../../../scripts/block';
import { Props } from '../../../../scripts/types';
import { render as compile } from 'pug';

export default class Contact extends Block {
  constructor(props: Props) {
    super({
      tagName: 'li',
      classList: 'contacts__item'
    }, '', {
      ...props,
      events: {
        click: props.setChat
      }
    });
  }

  render() {
    const template = `img(src='/' + img, alt=name).contacts__item__img.contact-img
.contacts__item__wrap
  .contacts__item__meta
    h3.contacts__item__name #{name}
    p.contacts__item__time #{time}
  .contacts__item__message
    p.contacts__item__text
      if you
        span You: 
      | #{message}
    if unread
      .contacts__item__unread #{unread}
    `;
    return compile(template, this.props);
  }
}