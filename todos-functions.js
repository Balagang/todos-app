'use strict'

const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        return []
    }
}

const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

const removeTodo = (id) => {
    const filterID = todos.findIndex((todo) => todo.id === id)

    if (filterID > -1) {
        todos.splice(filterID, 1)
    }
}

const renderTodos = (todos, filters) => {
    const todoEl = document.querySelector('#todos')
    const searchTodos = todos.filter((todo) => {
        // console.log(todo)
        const searchTExtMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompleted = !filters.hideCompleted || !todo.completed
        return searchTExtMatch && hideCompleted
    })

    const incompleteTodos = searchTodos.filter((e, index) => !e.completed)

    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummary(incompleteTodos))

    if (searchTodos.length > 0) {
        searchTodos.forEach((todo) => {
            todoEl.appendChild(generateTodosDOM(todo)) // accept only tag element
            // document.querySelector('#todos').append('p') // accept text & tag element
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.classList.add('empty-message')
        emptyMessage.textContent = 'No to-dos to show'
        todoEl.appendChild(emptyMessage) // accept only tag element
    }
}

const generateTodosDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    // p.textContent = todo.text // content format not preserve all come in single line *FASTER*
    // p.innerText = todo.text // preserve content format *SLOWER*
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')


    // input.type = 'checkbox'
    // input.id = 'check-box'
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)


    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        // console.log(todo.id)
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })


    return todoEl
}

const toggleTodo = (id) => {
    // const filterID = todos.findIndex((todo) => {
    //     return todo.id === id
    // })
    // if (filterID > -1) {
    //     if (todos[filterID].completed) {
    //         todos[filterID].completed = false
    //     } else todos[filterID].completed = true
    // }

    //return object if find match ID
    const findID = todos.find((todo) => todo.id === id)

    if (findID !== undefined) {
        findID.completed = !findID.completed
    }

}
const generateSummary = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    const plural = incompleteTodos.length > 1 ? 's' : ''
    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left!`
    return summary
}