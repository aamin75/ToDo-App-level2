// Declare
const labelItem = document.getElementById("countItem");
const labelCompleted = document.getElementById("countComplete");
let indexItem = 0;
let indexComplete = 0;
// Selectors
document.querySelector(".inputForm").addEventListener("submit", handleSubmitForm);
document.querySelector("ul").addEventListener("click", handleClickDeleteOrCheck);
document.getElementById("clearAll").addEventListener("click", handleClearAll);

// Event Handlers
function handleSubmitForm(e) {
    e.preventDefault();
    let input = document.querySelector("input");
    if (input.value != "") {
        addTodo(input.value);
    } else {
        document.querySelector("small").innerText = "Input must not be empty";
        // alert("Input must not be empty");
        return;
    }
    document.querySelector("small").innerText = "";
    input.value = "";

};

function handleClickDeleteOrCheck(e) {

    if (e.target.name == "deleteButton")
        deleteTodo(e);
    if (e.target.classList == "todo-item" || e.target.classList == "todo-item-completed")
        checkTodo(e);
    labelCompleted.innerText = `${indexComplete} completed`;
};

function handleClearAll(e) {
    document.querySelector("ul").innerHTML = "";
    indexItem = 0;
    indexComplete = 0;
    labelItem.innerText = `${indexItem} item`;
    labelCompleted.innerText = `${indexComplete} completed`;
};

// Helpers
function addTodo(todo) {
    let ul = document.querySelector("ul");
    let li = document.createElement("li");
    li.innerHTML = `
        <span class="todo-item">${todo}</span>
        <button name="deleteButton"><i class="fas fa-trash"></i></button>
    `;
    li.classList.add("todo-list-item");
    ul.appendChild(li);
    indexItem++;
    labelItem.innerText = `${indexItem} item`;

};

function checkTodo(e) {

    //let item = e.target.parentNode;
    if (e.target.classList == "todo-item-completed") {
        /*item.style.textDecoration = "none";*/
        indexComplete--;
        e.target.classList = "todo-item"
    } else {
        /*item.style.textDecoration = "line-through";*/
        indexComplete++;
        e.target.classList = "todo-item-completed"
    }
};

function deleteTodo(e) {
    let item = e.target.parentNode;
    if (item.childNodes[1].classList == "todo-item-completed")
        indexComplete--;

    item.addEventListener("transitionend", function() {
        item.remove();
    })
    item.classList.add("todo-list-item-fall");
    indexItem--;
    labelItem.innerText = `${indexItem} item`;
};