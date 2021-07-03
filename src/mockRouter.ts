import Block from "./scripts/block";
import {render} from "./scripts/globalFunctions";
import {checkAuth} from "./scripts/globalFunctions";
import user from "./data/user.json";

class Main extends Block {

    constructor () {

        super(
            undefined,
            "",
            {
                "auth": user.loggedin
            }
        );

    }

    componentDidMount () {

        checkAuth(this.props.auth);
        if (this.props.auth) {

            location.href = "./pages/chats/index.html";

        }

    }

}

render(
    "#root",
    new Main()
);
