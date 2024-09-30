import { App } from "../Modules/App";
import { Router } from "../Modules/Router";
import { AbstractView } from "./Abstract";

export class Logout extends AbstractView {
    constructor() {
        super();
        this.html = "<h1>good bye !</h1>";
    }

    allowed() {
        return App.token !== null;
    }

    render() {
        App.logout().then(() => {
            this.redirect();
        });
        return this.html;
    }
    redirect() {
        Router.navigateTo("/login");
    }
}
