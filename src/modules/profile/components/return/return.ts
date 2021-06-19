import Block from '../../../../scripts/block';
import { Props } from '../../../../scripts/types';
import { render as compile } from 'pug';

export default class Return extends Block {

  constructor(props: Props) {

    super({
      tagName: 'div',
      classList: 'return'
    }, '', {
      link: props.link
    });

  }

  render() {
    return compile(`a(href=link).return__link`, this.props);
  }
}