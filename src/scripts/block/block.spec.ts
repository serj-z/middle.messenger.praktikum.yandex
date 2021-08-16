import { expect } from 'chai';
import { Props } from '../dto/types';
import Block from './block';

const template = 'p(data-child="testChild") #{text}';
class TestComponent extends Block {
  constructor(props: Props) {
    super({
      tagName: 'div',
      classList: 'test-block'
    }, template, {
      text: props.text,
      events: {
        click: (e: Event) => {
          const target: HTMLElement = e.target as HTMLElement;
          target.textContent = 'new text';
        }
      }
    });
  }
}

describe('Работа с компонентом', () => {
  const component = new TestComponent({ text: 'test' });
  const content = component.getContent();
  const p = content.querySelector('p')!;

  it('Передача свойств', () => {
    expect(p.textContent).to.equal('test');
  });

  it('Обработка событий', () => {
    content.click();
    expect(content.textContent).to.equal('new text');
  });

  it('Динамическое создание дочерних компонентов', () => {
    component.setChildren('testChild', [
      new TestComponent({ text: 'test child' })
    ]);
    expect(content.textContent).to.include('test child');
  });
});