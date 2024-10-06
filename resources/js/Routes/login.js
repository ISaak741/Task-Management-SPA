<<<<<<< Updated upstream
=======
import { App } from "../Modules/App";
import { Router } from "../Modules/Router";
import { AbstractView } from "./Abstract";

export class Login extends AbstractView {
    constructor() {
        super();
        this.title = "login";
        this.links = `
            <a href="/register" class="text-gray-700 font-medium hover:text-blue-600" link>Register</a>
            <a href="/login" class="text-gray-700 font-medium hover:text-blue-600" link>Login</a>
        `;
        this.html = `
            <div class="flex items-center justify-center min-h-screen bg-gray-100">
                <div class="bg-white p-8 rounded-lg shadow-md w-96">
                    <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
                    <form action="#" method="POST" login>
                            <div error class="text-red-500 mb-3">
                            </div>
                            <div class="mb-4">
                                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" id="email" name="email" required email
                                    class="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
                            </div>
                            <div class="mb-6">
                                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                                <input type="password" id="password" name="password" password required
                                    class="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
                            </div>
                            <button type="submit"
                                class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">Login
                            </button>
                    </form>
                </div>
            </div>
        `;
    }

    allowed() {
        return App.token === null;
    }

    redirect() {
        Router.navigateTo("/home");
    }

    assignEvent() {
        document.querySelector("title").innerHTML = this.title;
        const login = document.querySelector("[login]");
        login.addEventListener("submit", async (e) => {
            e.preventDefault();
            const userCredentials = {
                email: document.querySelector("[email]").value,
                password: document.querySelector("[password]").value,
            };

            const response = await App.login(userCredentials);
            if (response.success) {
                this.redirect();
            } else {
                document.querySelector("[error]").innerHTML =
                    "email or password incorrect";
            }
        });
    }
}
>>>>>>> Stashed changes
