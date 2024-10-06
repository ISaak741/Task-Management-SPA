export class HttpRequest {
    constructor(csrfToken) {
        this.base_url = "http://127.0.0.1:8000/api";
        this.csrfToekn = csrfToken;
    }

    async send(method, route, body = null) {
        this.headers = {
            ...this.headers,
            Authorazation: `Bearer ${localStorage.getItem("TOKEN")}`,
        };
        const request = await fetch(`${this.base_url}${route}`, {
            method,
            headers: this.headers,
            body: body ? JSON.stringify(body) : null,
        });

        const response = await request.json();
        return response;
    }

    async post(route, body = null) {
        return this.send("POST", route, body);
    }

    async get(route) {
        return this.send("GET", route);
    }

    async put(route, body = null) {
        return this.send("PUT", route, body);
    }

    async delete(route, body = null) {
        return this.send("DELETE", route, body);
    }
}
