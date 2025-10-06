// Javascript

// Declaring variables
const completedElement = document.querySelector('#completedElement');
const inputToDo = document.querySelector('#inputToDo');
const addToDoBtn = document.querySelector('#addToDoBtn');
const infoTextElement = document.querySelector('small');
const todoList = document.querySelector('#todoList');
let todoText = '';
let completed = 0;
const allTheToDos = [];


// Add default text to the completedElement
completedElement.textContent = 'Du har ingen slutförd uppgift!'

// Add event listeners
addToDoBtn.addEventListener('click', addToDo);


function addToDo() {
    //things that will happen when you click the btn.

    infoTextElement.textContent = '';
    todoText = inputToDo.value;
    if (todoText.length == 0) {
        infoTextElement.textContent = 'Du måste skriva något!';
        return;
    }
    // Add todo to the todo array
    allTheToDos.push(todoText);

    // Create the li-element
    const item = document.createElement('li');


    //Create span for todo-text
    const itemText = document.createElement('span');
    itemText.innerText = todoText;

    // Create span for waste bin

    const thrashSpan = document.createElement('span');
    thrashSpan.innerText = ' 🗑️';
    thrashSpan.classList.add('thrash-icon');

    // Add event listener for waste bin
    thrashSpan.addEventListener('click', () => {
        if (itemText.classList.contains('completed')) {
            completed--;
            completedElement.textContent = updateCompleted();
        }
        // Always remove from DOM
        item.remove();
        
        // Creating a new temporary array with the remaining DOM-elements
        const items = [...todoList.querySelectorAll('li > span:first-child')];
        // Empty the old array
        allTheToDos.length = 0;
        // Create a new array from the text in span and push it into the old one 
        allTheToDos.push(...items.map(span => span.textContent));



    });
    // add event listener to span with text
    itemText.addEventListener('click',
        function () {
            if (itemText.classList.contains('completed')) {
                itemText.setAttribute('class', '');
                completed--;
                completedElement.textContent = updateCompleted();

            }
            else {
                itemText.setAttribute('class', 'completed')
                completed++;
                completedElement.textContent = updateCompleted();
            }

        }
    )
    // Add the todos and the thrash bin to the DOM.
    item.appendChild(itemText);
    item.appendChild(thrashSpan);
    todoList.appendChild(item);

    inputToDo.value = '';
}

//Function for updating the number of tasks completed
const updateCompleted = () => {
    if (completed === 1) {
        return 'Du har ' + completed + ' slutförd uppgift!';
    }

    else {
        return 'Du har ' + completed + ' slutförda uppgifter!';
    }
};


// Empty textfield when reloading browser.
inputToDo.value = '';




