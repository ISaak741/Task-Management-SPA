export class Table {
    constructor(tasks) {
        this.tasks = tasks;
        this.html = `
            <table class="w-2/3 bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                    <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th class="py-3 px-6 text-left">ID</th>
                        <th class="py-3 px-6 text-left">Title</th>
                        <th class="py-3 px-6 text-left">Status</th>
                        <th class="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody class="text-gray-600 text-sm font-light">
                    {{content}}
                </tbody>
            </table>    
        `;
    }

    render() {
        let placeHolder = "";
        for (const task of this.tasks)
            placeHolder += `
            <tr class="border-b border-gray-200 hover:bg-gray-100">
                <td class="py-3 px-6 text-left">${task.id}</td>
                <td class="py-3 px-6 text-left">${task.title}</td>
                <td class="py-3 px-6 text-left"><span class="${
                    task.status
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                } py-1 px-2 rounded-full text-xs">${
                task.status ? "Done" : "Pending"
            }</span></td>
                <td class="py-3 px-6 text-center" action>
                    <button class="text-blue-500 hover:bg-blue-700 rounded-md px-3 py-1 hover:text-white" edit-id="${
                        task.id
                    }">Edit</button>
                    <button class="text-red-500 hover:bg-red-700 rounded-md px-3 py-1 hover:text-white ml-2" delete-id="${
                        task.id
                    }">Delete</button>
                </td>
            </tr>
            `;

        return (this.html = this.html.replace("{{content}}", placeHolder));
    }
}
