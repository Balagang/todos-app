'use strict'

const todos = getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}

// initial rendering
renderTodos(todos, filters)

document.querySelector('input#filter-todo').addEventListener('input', (e) => {
    // console.log(e.target.value)
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})


document.querySelector('#new-todos-form').addEventListener('submit', (e) => {
    const text = e.target.elements.text.value.trim()
    e.preventDefault()

    if (text.length > 0) {
        console.log(text)
        todos.push({
            id: crypto.randomUUID(),
            text,
            completed: false
        })
        saveTodos(todos)
        renderTodos(todos, filters)
        e.target.elements.text.value = ''
    }
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    // console.log(e.target.checked)
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})