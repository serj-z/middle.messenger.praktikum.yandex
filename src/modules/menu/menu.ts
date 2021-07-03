import Block from '../../scripts/block';
import MenuItem from './components/menu-item';
import IconButton from '../../components/icon-btn/iconBtn';
import user from '../../data/user.json';

const tmpl: string = `img(src=img, alt="user", class="menu__img")

.menu__user 
  h3.menu__fullname #{firstname} #{lastname}
  p.menu__username #{username}

nav.menu__list(data-child='menuItems')

.menu__burger
div(data-child='close')`;

const items = [
  {
    link: '/pages/profile/index.html',
    text: 'Profile',
    img: '/profile.svg',
    classList: 'menu__profile'
  },
  {
    link: '#',
    text: 'Add contact',
    img: '/add-contact.svg',
    classList: 'menu__add-contact',
    events: {
      click: (e: Event) => {
        e.stopPropagation();
        const elem: HTMLElement = document.querySelector('.add-contact')!;
        elem.classList.add('opened');
        elem.parentElement!.classList.add('opened');
      }
    }
  },
  {
    link: '/pages/login/index.html',
    text: 'Log out',
    img: '/log-out.svg',
    classList: 'menu__log-out'
  }
];

export default class MenuItems extends Block {
  constructor() {
    super({
      tagName: 'aside',
      classList: 'menu'
    }, tmpl, { ...user }, {
      menuItems: items.map(item => new MenuItem(item)),
      close: [new IconButton({
        type: 'button',
        img: 'cross.svg',
        text: '11',
        classList: 'menu__close',
        events: {
          click: (e: Event) => {
            e.stopPropagation();
            document.querySelector('.menu')?.classList.remove("opened");
          }
        }
      })]
    });
  }
}