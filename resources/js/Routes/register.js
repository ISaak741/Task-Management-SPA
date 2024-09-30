import { Router } from "../Modules/Router";
import { App } from "../Modules/App";
import { AbstractView } from "./Abstract";

export class Register extends AbstractView {
    constructor() {
        super();
        this.title = "Register";
        this.links = `
            <a href="/register" class="text-gray-700 font-medium hover:text-blue-600" link>Register</a>
            <a href="/login" class="text-gray-700 font-medium hover:text-blue-600" link>Login</a>
        `;
        this.html = `
            <div class="flex items-center justify-center min-h-screen bg-gray-100">
                <div class="bg-white p-8 rounded-lg shadow-md w-96">
                    <h2 class="text-2xl font-bold text-center mb-6">Register</h2>
                    <form action="#" method="POST" register>
                            <div class="mb-4">
                                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" id="name" name="name" required username
                                    class="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
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
                            <div class="mb-6">
                                <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <input type="password" id="password_confirmation" name="password_confirmation" password_confirmation  required
                                    class="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
                            </div>
                            <button type="submit"
                                class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">Register
                            </button>
                    </form>
                </div>
            </div>
        `;
    }

    allowed() {
        return App.token === null;
    }

    assignEvent() {
        const register = document.querySelector("[register]");
        register.addEventListener("submit", async (e) => {
            e.preventDefault();
            const userCredentials = {
                name: document.querySelector("[username]").value,
                email: document.querySelector("[email]").value,
                password: document.querySelector("[password]").value,
                password_confirmation: document.querySelector(
                    "[password_confirmation]"
                ).value,
            };
            const response = await App.register(userCredentials);
            if (response.success) this.redirect();
        });
    }

    redirect() {
        Router.navigateTo("/home");
    }
}
