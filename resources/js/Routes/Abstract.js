import { Router } from "../Modules/Router";

export class AbstractView {
    render() {
        const navLinks = document.querySelector("[links]");
        const mainApp = document.querySelector("[main-app]");
        setTimeout(() => {
            Router.preventLinks();
            this.assignEvent();
        }, 0);

        mainApp.innerHTML = this.html;
        navLinks.innerHTML = this.links;
    }

    assignEvent() {}

    allowed() {}

    redirect() {}
}
