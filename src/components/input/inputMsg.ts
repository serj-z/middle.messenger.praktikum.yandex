import Block from '../../scripts/block';

export default class InputMsg extends Block {
  constructor() {
    super({
      tagName: 'p'
    }, 'span #{text}');
  }
}