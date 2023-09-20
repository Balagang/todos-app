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
    const searchTodos = todos.filter((todo) => {
        // console.log(todo)
        const searchTExtMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompleted = !filters.hideCompleted || !todo.completed
        return searchTExtMatch && hideCompleted
    })

    const incompleteTodos = searchTodos.filter((e, index) => !e.completed)

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummary(incompleteTodos))

    searchTodos.forEach((todo) => {
        document.querySelector('#todos').appendChild(generateTodosDOM(todo)) // accept only tag element
        // document.querySelector('#todos').append('p') // accept text & tag element
    })
}

const generateTodosDOM = (todo) => {
    const todosEl = document.createElement('div')
    // p.textContent = todo.text // content format not preserve all come in single line *FASTER*
    // p.innerText = todo.text // preserve content format *SLOWER*
    const input = document.createElement('input')
    const span = document.createElement('span')
    const button = document.createElement('button')
    button.addEventListener('click', () => {
        // console.log(todo.id)
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    // input.type = 'checkbox'
    // input.id = 'check-box'
    input.setAttribute('type', 'checkbox')
    if (todo.completed) {
        input.checked = true
    }
    todosEl.appendChild(input)
    input.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })


    button.textContent = 'Remove'
    span.textContent = todo.text
    todosEl.appendChild(span)

    todosEl.appendChild(button)
    return todosEl
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
    summary.textContent = `You have ${incompleteTodos.length} todos left!`
    return summary
}