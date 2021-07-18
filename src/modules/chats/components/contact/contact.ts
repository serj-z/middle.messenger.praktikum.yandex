import Block from '../../../../scripts/block';
import { Props } from '../../../../scripts/dto/types';
import { render as compile } from 'pug';
import { calcDateTime } from '../../../../scripts/globalFunctions';
import { chat } from '../../chats';

export default class Contact extends Block {
  constructor(props: Props) {
    super({
      tagName: 'li',
      classList: 'contacts__item'
    }, '', {
      lastSender: props.last_message?.user,
      ...props,
      time: props.last_message ? calcDateTime(props.last_message.time) : '',
      events: {
        click: () => {
          chat.setProps({ contact: this });
          props.setChat();
        }
      }
    });
  }

  render() {
    const template = `img(src=avatar ? 'https://ya-praktikum.tech/api/v2/resources' + avatar : '/chat-placeholder.png', alt=title).contacts__item__img.contact-img
.contacts__item__wrap
  .contacts__item__meta
    h3.contacts__item__name #{title}
    if last_message
      p.contacts__item__time #{time}
  if last_message
    .contacts__item__message
      p.contacts__item__text
        if user.login === lastSender.login
          span You: 
        | #{last_message.content}
      if unread_count
        .contacts__item__unread #{unread_count}
    `;
    return compile(template, this.props);
  }
}