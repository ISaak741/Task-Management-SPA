import { Router } from "../Modules/Router";

export class AbstractView {
    render() {
        const navLinks = document.querySelector("[links]");
        const mainApp = document.querySelector("[main-app]");
        const title = document.querySelector("title");
        setTimeout(() => {
            Router.preventLinks();
            this.assignEvent();
        }, 0);

        mainApp.innerHTML = this.html;
        navLinks.innerHTML = this.links;
        title.innerText = this.title;
    }

    assignEvent() {}

    allowed() {}

    redirect() {}
}
