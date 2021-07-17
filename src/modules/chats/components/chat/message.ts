import Block from '../../../../scripts/block';
import { Props } from '../../../../scripts/dto/types';

const tmpl: string = `if dateFormatted
  p.dialog__date #{dateFormatted}
else
  div(class=\`message__wrap \${message.type === 'file' ? 'message__img': 'message__text'}\`)
    if message.file
      img(src='/'+message.path, alt=message.filename)
    else
      | #{message.content}
    span(class=\`message__time \${currentUser.id === message.user_id && message.is_read ? 'message-read': ''}\`) #{timeFormatted}`;

export default class Message extends Block {
  constructor(props: Props) {
    super({
      tagName: 'div',
      classList: props.dateFormatted ? '' : `message ${props.message.user_id === props.user.id ? 'message-outcoming' : 'message-incoming'}`
    }, tmpl, {
      message: props.message,
      timeFormatted: props.timeFormatted,
      dateFormatted: props.dateFormatted,
      currentUser: props.user
    });
  }
}