export class Router {
    constructor() {
        this.routes = [
            {
                path: "/",
                view: "<h1> hello from <span style='color red'> / </span>",
            },
            {
                path: "/users",
                view: "<h1> hello from <span style='color red'> users </span>",
            },
        ];

        this.init();
    }

    navigateTo(route) {
        history.pushState({}, "", route);
        this.route();
    }

    async route() {
        const routeName = location.pathname ?? "";
        const matchedRoute = this.routes.find((r) => r.path === routeName);

        if (!matchedRoute) matchedRoute = this.routes[0];

        await this.execute(matchedRoute);
    }

    async execute(route) {
        const mainApp = document.querySelector("[main-app]");
        mainApp.innerHTML = route.view;
    }

    async init() {
        document.addEventListener("DOMContentLoaded", () => {
            document.querySelectorAll("[link]").forEach((link) => {
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    this.navigateTo(e.target.href);
                });
            });
            this.route();
            window.onpopstate = this.route.bind(this);
        });
    }
}
