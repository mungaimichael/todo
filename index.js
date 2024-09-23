// Elements
const userInput = getElementFromDom("#todo-input");
const todosWrapper = getElementFromDom(".todos");
const addButton = getElementFromDom('#add-button');

let initalValues = JSON.parse(localStorage.getItem('todos'))
let todosArray = initalValues || [];

// Functions
function getElementFromDom(selector) {
    return document.querySelector(selector);
}

function addTodoToLocalStorage() {
    const userValue = userInput.value.trim();
    if (userValue) {
        console.log(userValue)
        todosArray.push(userValue);
        localStorage.setItem('todos', JSON.stringify(todosArray));
        userInput.value = '';
        embedToDom();
    }
}

function embedToDom() {
    todosWrapper.innerHTML = todosArray.length
        ? todosArray.map((item, index) => {
            console.log(item, index);
            return `
            <li>
                ${item}
                <button onclick="removeTodo(${index})">del</button>
            </li>
        `
        }).join('')
        : '<li>No items to show</li>';
}

function removeTodo(index) {
    todosArray.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todosArray));
    embedToDom();
}

// Event Listeners
addButton.addEventListener("click", addTodoToLocalStorage);
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTodoToLocalStorage();
    }
});

// Initial render
embedToDom();

// console.log(userInput)