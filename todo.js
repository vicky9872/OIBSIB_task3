let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");
let ClearAllTodoButton = document.getElementById("ClearAllTodoButton");

function getTodoList() {
    let returnObject = localStorage.getItem("todoList");
    let parsedobj = JSON.parse(returnObject);

    if (parsedobj === null) {
        return [];
    } else {
        return parsedobj;
    }
}

let todoList = getTodoList();
let todosCount = todoList.length;


function saveTodo() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    console.log(todoList);
}
saveTodoButton.onclick = function() {
    saveTodo();
};

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);

    labelElement.classList.toggle('checked');

    let todoIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    let todoObj = todoList[todoIndex];
    if (todoObj.isChecked === true) {
        todoObj.isChecked = false;
    } else {
        todoObj.isChecked = true;
    }


}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deleteTodoIndex = todoList.findIndex(function(eachItem) {
        let eachTodoId = "todo" + eachItem.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteTodoIndex, 1);
    saveTodo();
}


function createAndAppendTodo(todo) {

    let todoId = 'todo' + todo.uniqueNo;
    let checkboxId = 'checkbox' + todo.uniqueNo;
    let labelId = 'label' + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;

    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };

    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };

    deleteIconContainer.appendChild(deleteIcon);

    saveTodo();
    if (todoList.length === null) {
        ClearAllTodoButton.classList.add("d-none");
    } else {
        ClearAllTodoButton.classList.remove("d-none");
    }
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}

function addInputTodo() {

    let todoUserInputEl = document.getElementById("todoUserInput");

    todosCount = todosCount + 1;

    if (todoUserInputEl.value === "") {
        alert("Enter valid input.!");
        return;
    }

    let newTodo = {
        text: todoUserInputEl.value,
        uniqueNo: todosCount,
        isChecked: false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    todoUserInputEl.value = "";
}

addTodoButton.onclick = function() {
    addInputTodo();

};

ClearAllTodoButton.onclick = function() {
    todoList.splice(0, todoList.length);
    todoItemsContainer.textContent = "";
    saveTodo();

};

function emptyTasks() {
    if (todoList.length === 0) {

    }
}
