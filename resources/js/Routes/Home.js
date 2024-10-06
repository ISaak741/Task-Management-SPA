import { Router } from "../Modules/Router";
import { App } from "../Modules/App";
import { AbstractView } from "./Abstract";
import { Table } from "./Component/Table";

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
            <div class="min-h-screen bg-gray-100 p-5">
                <div class="text-right my-3">
                    <button class="bg-red-400 text-white font-medium hover:bg-red-500 px-5 py-2 rounded-md" add-task> Add Task </button>
                </div>
                <div class="flex justify-center items-start" data-content>
                </div>
            </div>
            <div class="hidden absolute top-0 left-0 h-full w-full bg-gray-700 opacity-40" --body-->
            </div>
            <form class="hidden left-1/3 absolute w-1/3 bg-white h-1/2 top-1/4 p-8 rounded-md shadow-sm" modal>
                <div class="mb-4">
                    <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" id="title" name="title" required title
                        class="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
                </div>
                <div class="mb-4">
                    <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
                    <input type="number" id="status" name="status" required status
                        class="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
                </div>
                <button type="submit"
                    class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">Login
                </button>
            </form>
        `;

        this.fetchTasks();
    }
    assignEvent() {
        const button = document.querySelector("[add-task]");
        const modal = document.querySelector("[modal]");
        const body = document.querySelector("[--body--]");
        button.addEventListener("click", (e) => {
            e.stopPropagation();
            body.classList.remove("hidden");
            modal.classList.remove("hidden");
        });

        modal.addEventListener("submit", (e) => {
            e.preventDefault();
            const taskPayload = {
                title: modal.querySelector("[title]").value,
                status:
                    Number.parseInt(modal.querySelector("[status]").value) > 0,
            };

            App.createTask(taskPayload).then((data) => {
                this.redirect("/home");
            });
        });

        window.addEventListener("click", (e) => {
            const target = e.target;
            if (
                target.tagName !== "INPUT" &&
                target.tagName !== "BUTTON" &&
                !target.hasAttribute("modal")
            ) {
                modal.classList.add("hidden");
                body.classList.add("hidden");
            }
        });
    }
    allowed() {
        console.log("hello from if allowed");
        return App.token !== null;
    }

    fetchTasks() {
        App.getTasks().then((tasks) => {
            const table = new Table(tasks.data);
            document.querySelector("[data-content]").innerHTML = table.render();
            document.querySelectorAll("[action]").forEach((action) => {
                const taskDelete = action.querySelector("[delete-id]");
                taskDelete.addEventListener("click", async () => {
                    await App.deleteTask(taskDelete.getAttribute("delete-id"));
                    action.parentElement.remove();
                });
            });
        });
    }

    redirect() {
        console.log("redirecting ...");
        Router.navigateTo("/login");
    }
}
