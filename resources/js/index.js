import { Task } from "./Task";
import { App } from "./App";

const app = App.init();

await app.login({
    email: "isaak01@email.com",
    password: "isaak01@",
});

await app.createTask({});
await app.getTasks({});
await app.updateTask({});
await app.deleteTask({});

let task = new Task(app.csrfToken, app.token);

await task.createTask({
    title: "hello all",
    status: false,
});
