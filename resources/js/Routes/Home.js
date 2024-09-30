import { Router } from "../Modules/Router";
import { App } from "../Modules/App";
import { AbstractView } from "./Abstract";

export class Home extends AbstractView {
    constructor() {
        super();
        this.title = "Home";
        this.links = `
            <div class="flex items-center space-x-4">
                <a href="/home" class="text-gray-700 font-medium hover:text-blue-600" link>Home</a>
                <a href="/logout" class="text-white bg-sky-500 px-5 py-1.5 hover:bg-sky-600  rounded-md font-medium" link>Logout</a>
            </div>
        `;
        this.html = `
            <div class="flex items-center justify-center min-h-screen bg-gray-100">
                <h1> welcome to the home page </h1>
            </div>
        `;
    }

    allowed() {
        console.log("hello from if allowed");
        return App.token !== null;
    }

    redirect() {
        console.log("redirecting ...");
        Router.navigateTo("/login");
    }
}
