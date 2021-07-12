import Block from '../../scripts/block';
import IconButton from '../../components/icon-btn/iconBtn';
import user from '../../data/user.json';
import { Paths } from '../../scripts/dto/types';
import Link from '../../components/link/link';
import Markup from '../../components/markup/markup';
import { listenEvent, logout } from '../../scripts/globalFunctions';

const tmpl: string = `img(src=img, alt="user", class="menu__img")

.menu__user 
  h3.menu__fullname #{firstname} #{lastname}
  p.menu__username #{username}

nav.menu__list(data-child='menuItems')

.menu__burger
div(data-child='close')`;

export default class MenuItems extends Block {
  constructor() {
    super({
      tagName: 'aside',
      classList: 'menu'
    }, tmpl, {
      ...user,
      events: {
        click: function (e: Event) {
          e.stopPropagation();
          this.classList.add("opened");
        }
      }
    }, {
      menuItems: [
        new Link({ text: '', classList: 'menu__item menu__profile', path: Paths.PROFILE, template: 'img(src="/profile.svg", alt="Profile").menu__item__img\nspan Profile' }),
        new Markup({
          tag: 'a',
          classList: 'menu__item menu__add-contact',
          template: 'img(src="/add-contact.svg", alt="Add contact").menu__item__img\nspan Add contact',
          props: {
            events: {
              click: (e: Event) => {
                e.preventDefault();
                e.stopPropagation();
                const elem: HTMLElement = document.querySelector('.add-contact')!;
                elem.classList.add('opened');
                elem.parentElement!.classList.add('opened');
              }
            }
          }
        }),
        new Markup({
          tag: 'a',
          classList: 'menu__item menu__log-out',
          template: 'img(src="/log-out.svg", alt="Log out").menu__item__img\nspan Log out',
          props: {
            events: {
              click: async (e: Event) => {
                e.preventDefault();
                logout();
              }
            }
          }
        }),
      ],
      close: [new IconButton({
        type: 'button',
        img: 'cross.svg',
        text: '11',
        classList: 'menu__close',
        events: {
          click: (e: Event) => {
            e.stopPropagation();
            this.getContent().classList.remove("opened");
          }
        }
      })]
    });

    listenEvent(window, 'click', (e: Event) => {
      e.stopPropagation();
      this.getContent().classList.remove("opened");
    });
  }
}