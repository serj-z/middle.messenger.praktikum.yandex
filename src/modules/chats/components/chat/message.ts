import Block from '../../../../scripts/block/block';
import { Props } from '../../../../scripts/dto/types';

const tmpl: string = `if dateFormatted
  p.dialog__date #{dateFormatted}
else
  if sender
    .message__meta
      img(src=sender.avatar ? 'https://ya-praktikum.tech/api/v2/resources' + sender.avatar : '/user-placeholder.png', alt=sender.login).message__avatar
    p.message__sender #{sender.display_name ? sender.display_name : sender.first_name + ' ' + sender.second_name}
  div(class=\`message__wrap \${message.type === 'file' ? 'message__img': 'message__text'}\`)
    if message.file
      img(src='https://ya-praktikum.tech/api/v2/resources'+message.file.path, alt=message.file.filename)
    else
      | #{message.content}
    span(class=\`message__time \${currentUser.id === message.user_id && message.is_read ? 'message-read': ''}\`) #{timeFormatted}`;

export default class Message extends Block {
  constructor(props: Props) {
    super({
      tagName: 'div',
      classList: props.dateFormatted ? 'chat-date' : `message ${props.message.user_id === props.user.id ? 'message-outcoming' : 'message-incoming'} ${props.sender ? 'sender' : 'no-sender'}`
    }, tmpl, {
      message: props.message,
      timeFormatted: props.timeFormatted,
      dateFormatted: props.dateFormatted,
      currentUser: props.user,
      sender: props.sender
    });
  }
}