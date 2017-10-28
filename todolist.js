var todos = [];

var answer;
while (answer != "quit") {
    answer = prompt("What would you like to do?");
    if (answer == "new") {
        item = prompt("Enter TODO");
        newTodo(item);
    } else if (answer == "list") {
        listTodos();
    } else if (answer == "delete") {
        item = prompt("Enter TODO");
        deleteTodo(item-1);
    }
}

function newTodo(item) {
    console.log("*** added item");
    todos.push(item);
}

function deleteTodo(item) {
    console.log("*** deleted item");
    todos.splice(item, 1);
}

function listTodos() {
    for (i=0; i<todos.length; i++) {
        console.log(i+1 + ". " + todos[i]);
    }
}

// quit message
console.log("Goodbye!");
