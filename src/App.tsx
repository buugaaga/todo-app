/**
 * Здравствуйте!
 *
 * Найдите пожалуйста ошибки коде,
 * а также, по возможности, оптимизируйте время рендера (не трогая ExpensiveTree).
 *
 * Пришлите ссылку с исправленным кодом (Gist, CodeSandbox, CodePen, JSBin, PasteBin, etc)
 */

import { FC, useEffect, useState, memo } from 'react'

type Props = {
  todos?: TodoItem[]
}

type TodoItem = {
  id: string | number
  title: string
  isDone?: boolean
}

const App: FC<Props> = (props) => {
  const [todos, setTodos] = useState<TodoItem[]>(props.todos || [])
  const [filter, setFilter] = useState<'all' | 'undone'>('all')
  const [doneCount, setDoneCount] = useState(0)

  useEffect(() => {
    if (props.todos?.length) {
      setFilter('all')
    }
  }, [])

  const addTodo = (title?: string) => {
    if (!title) {
      title = prompt('What to do?')
    }
    setTodos((todos) => [
      ...todos,
      {
        id: Date.now(),
        title,
      },
    ])
  }

  const markAsDone = (todo: TodoItem) => {
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo) =>
        prevTodo.id === todo.id
          ? {
              ...prevTodo,
              isDone: true,
            }
          : prevTodo
      )
    )
    setDoneCount(doneCount + 1)
  }

  const markAsUndone = (todo: TodoItem) => {
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo) =>
        prevTodo.id === todo.id
          ? {
              ...prevTodo,
              isDone: false,
            }
          : prevTodo
      )
    )
    setDoneCount(doneCount - 1)
  }

  const deleteTodo = (todo: TodoItem) => {
    if (todo.isDone) {
      setDoneCount(doneCount - 1)
    }
    setTodos((prevTodos) => prevTodos.filter(({ id }) => id !== todo.id))
  }

  const onFilterButtonClick = () => {
    setFilter(filter === 'all' ? 'undone' : 'all')
  }

  return (
    <div>
      <p>{`${doneCount} / ${todos.length}`}</p>
      <ul>
        {todos
          .filter((todo) => (filter === 'undone' ? !todo.isDone : true))
          .map((todo) => (
            <div key={`${todo.id}`}>
              <p>{`${todo.isDone ? '✅ ' : ''}${todo.title}`}</p>
              <button
                onClick={() => {
                  todo.isDone ? markAsUndone(todo) : markAsDone(todo)
                }}
              >
                {'Done'}
              </button>
              <button onClick={() => deleteTodo(todo)}>{'Delete'}</button>
            </div>
          ))}
      </ul>
      <button onClick={() => addTodo()}>{'Add'}</button>
      <button onClick={() => onFilterButtonClick()}>
        {`Show ${filter === 'all' ? 'undone' : 'all'} todos`}
      </button>
      <WrappedExpensiveTree />
    </div>
  )
}

function ExpensiveTree() {
  let now = performance.now()
  while (performance.now() - now < 1000) {
    // Artificial delay -- do nothing for 1000ms
  }

  return null
}

const WrappedExpensiveTree = memo(ExpensiveTree)

export default App
