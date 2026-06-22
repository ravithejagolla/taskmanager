import { useEffect, useState } from 'react'
import './App.css'

const API_BASE = 'http://localhost:5000/api/task'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(API_BASE)
      if (!response.ok) {
        throw new Error('Unable to load tasks')
      }

      const data = await response.json()
      setTasks(data.tasks || [])
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (event) => {
    event.preventDefault()
    setError('')

    if (!title.trim() || !description.trim()) {
      setError('Please add both a title and description.')
      return
    }

    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title.trim(), description: description.trim() })
      })

      if (!response.ok) {
        const body = await response.json()
        throw new Error(body.message || 'Unable to create task')
      }

      setTitle('')
      setDescription('')
      fetchTasks()
    } catch (err) {
      setError(err.message || 'Failed to create task')
    }
  }

  const handleToggleStatus = async (task) => {
    setError('')
    const nextStatus = task.status === 'completed' ? 'pending' : 'completed'

    try {
      const response = await fetch(`${API_BASE}/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: nextStatus })
      })

      if (!response.ok) {
        throw new Error('Unable to update task')
      }

      setTasks((currentTasks) =>
        currentTasks.map((item) =>
          item._id === task._id ? { ...item, status: nextStatus } : item
        )
      )
    } catch (err) {
      setError(err.message || 'Failed to update task')
    }
  }

  const handleDeleteTask = async (taskId) => {
    setError('')

    try {
      const response = await fetch(`${API_BASE}/${taskId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Unable to delete task')
      }

      setTasks((currentTasks) => currentTasks.filter((item) => item._id !== taskId))
    } catch (err) {
      setError(err.message || 'Failed to delete task')
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p>Manage your tasks efficiently</p>
      </header>

      <main>
        <section className="task-form-card">
          <h2>Add a new task</h2>
          {error && <div className="error-banner">{error}</div>}
          <form onSubmit={handleCreateTask} className="task-form">
            <label>
              Title
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Task title"
              />
            </label>
            <label>
              Description
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Task description"
              />
            </label>
            <button type="submit" className="primary-button">
              Add Task
            </button>
          </form>
        </section>

        <section className="task-list-card">
          <div className="task-list-header">
            <h2>Your tasks</h2>
            <button type="button" className="refresh-button" onClick={fetchTasks}>
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="empty-state">Loading tasks…</div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">No tasks yet. Add one above.</div>
          ) : (
            <ul className="task-list">
              {tasks.map((task) => (
                <li key={task._id} className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
                  <div className="task-details">
                    <div className="task-title-row">
                      <h3>{task.title}</h3>
                      <span className={`status-badge ${task.status}`}>{task.status}</span>
                    </div>
                    <p>{task.description}</p>
                  </div>
                  <div className="task-actions">
                    <button onClick={() => handleToggleStatus(task)} className="secondary-button">
                      {task.status === 'completed' ? 'Mark Incomplete' : 'Mark Complete'}
                    </button>
                    <button onClick={() => handleDeleteTask(task._id)} className="danger-button">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
