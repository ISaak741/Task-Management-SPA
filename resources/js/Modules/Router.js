import { Home } from "../Routes/Home";
import { Logout } from "../Routes/Logout";
import { Login } from "../Routes/login";
import { Register } from "../Routes/register";

export class Router {
    HAS_INSTANCE = false;
    static make() {
        Router.HAS_INSTANCE = true;
        Router.routes = [
            {
                path: "/",
                view: Register,
            },
            {
                path: "/logout",
                view: Logout,
            },
            {
                path: "/home",
                view: Home,
            },
            {
                path: "/login",
                view: Login,
            },
        ];

        Router.init();
    }

    static navigateTo(route) {
        history.pushState({}, "", route);
        Router.route();
    }

    static async route() {
        const routeName = location.pathname ?? "";
        let matchedRoute = Router.routes.find((r) => r.path === routeName);

        if (!matchedRoute) matchedRoute = Router.routes[0];

        await Router.execute(matchedRoute);
    }

    static async execute(route) {
        const view = new route.view();
        if (view.allowed()) view.render();
        else view.redirect();
    }

    static async init() {
        document.addEventListener("DOMContentLoaded", () => {
            Router.preventLinks();
            Router.route();
            window.onpopstate = Router.route;
        });
    }

    static preventLinks() {
        document.querySelectorAll("[link]").forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                this.navigateTo(e.target.href);
            });
        });
    }
}
