import Block from '../../scripts/block/block';
import IconButton from '../../components/icon-btn/iconBtn';
import { Paths } from '../../scripts/dto/types';
import Link from '../../components/link/link';
import Markup from '../../components/markup/markup';
import { listenEvent, logout } from '../../scripts/globalFunctions';

const tmpl: string = `img(src=user.avatar ? 'https://ya-praktikum.tech/api/v2/resources' + user.avatar : '/user-placeholder.png', alt=user.login, class="menu__img")

.menu__user 
  h3.menu__fullname \#{user.display_name ? user.display_name : user.first_name + ' ' + user.second_name}
  p.menu__username #{user.login}

nav.menu__list(data-child='menuItems')

.menu__burger
div(data-child='close')`;

export default class MenuItems extends Block {
  constructor() {
    super({
      tagName: 'aside',
      classList: 'menu'
    }, tmpl, {
      user: {},
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
          classList: 'menu__item menu__create-chat',
          template: 'img(src="/add-contact.svg", alt="Create chat").menu__item__img\nspan Create chat',
          props: {
            events: {
              click: (e: Event) => {
                e.preventDefault();
                e.stopPropagation();
                const elem: HTMLElement = document.querySelector('.create-chat')!;
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