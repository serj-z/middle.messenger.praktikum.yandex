import Block from '../../scripts/block';
import tmpl from './template.pug';
import MenuItem from './components/menu-item';
import IconButton from '../../components/icon-btn/iconBtn';
import user from '../../data/user.json';

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
    classList: 'menu__add-contact'
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
            document.querySelector('.menu').classList.remove("opened");
          }
        }
      })]
    });
  }
}