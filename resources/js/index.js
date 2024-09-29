import { App } from "./Modules/App";

const app = App.init();

await app.login({
    email: "isaak01@email.com",
    password: "password",
});

await app.createTask({
    title: "hello from js side",
    status: false,
});

await app.getTasks({});
await app.getTask(200);
await app.deleteTask(15);
await app.updateTask(35, {
    title: "that is a lot from js",
    status: true,
});
