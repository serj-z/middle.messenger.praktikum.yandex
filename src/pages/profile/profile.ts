import {checkAuth, listenEvent, render} from "../../scripts/globalFunctions";
import user from "../../data/user.json";
import Profile from "../../modules/profile/profile";
import Markup from "../../components/markup/markup";
import Input from "../../modules/profile/components/input/input";

const actions = `a(href="/pages/edit-profile/index.html").profile__action.t-purple Edit profile
a(href="/pages/change-pass/index.html").profile__action.t-purple Change password
a(href="/pages/login/index.html").profile__action.t-red Log out`,

    inputs = [
        {
            "label": "E-mail",
            "type": "email",
            "name": "email",
            "disabled": true,
            "value": user.email
        },
        {
            "label": "Username",
            "type": "text",
            "name": "username",
            "disabled": true,
            "value": user.username
        },
        {
            "label": "E-mail",
            "type": "text",
            "name": "Firstname",
            "disabled": true,
            "value": user.firstname
        },
        {
            "label": "Lastname",
            "type": "text",
            "name": "lastname",
            "disabled": true,
            "value": user.lastname
        },
        {
            "label": "Displayname",
            "type": "text",
            "name": "displayname",
            "disabled": true,
            "value": user.displayname
        },
        {
            "label": "Phone",
            "type": "tel",
            "name": "phone",
            "disabled": true,
            "value": user.phone
        }
    ];

export default class ProfilePage extends Profile {

    constructor () {

        super({
            "tag": "div",
            "inputs": [
                ...inputs.map((item) => new Input(item)),
                new Markup({
                    "classList": "profile__actions",
                    "template": actions
                })
            ],
            "return": "/"
        });

    }

    componentDidMount () {

        checkAuth(user.loggedin);

    }

}

render(
    "#root",
    new ProfilePage()
);

listenEvent(
    ".modal-bg",
    "click",
    function (e: Event) {

        if (e.target !== this) {

            return;

        }
        document.querySelectorAll(".modal-bg, .modal").forEach((item) => item.classList.remove("opened"));

    }
);
