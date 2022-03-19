import React from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About.js';
import Footer from './components/Footer.js';
import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState ([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  // fetch tasks from the json server
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    // setTasks(data)
    return data
  }

  // fetch one task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    // setTasks(data)
    return data
  }

  // delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Save task
  const saveTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    task = await res.json()
    return task;
  }
  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updateTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }
    setTasks( tasks.map(  (task) => task.id === id ? {
                    ...task,
                    reminder: !task.reminder
                  }: task
              )
    )
  }
  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data])
    // const id = Math.floor(Math.random() * 1000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  // show add task inputs
  const showTaskInputs = () => {
    setShowAddTask(true)
  }

  const onAdd = () => {
    setShowAddTask(!showAddTask)
  }

  return (
    <Router>
      <div className="container">
        <Header title="Task Tracker"
                onAdd={ onAdd }
                showAddTask={ showAddTask }/>
              <Routes>
                <Route path='/'  element= {
                    <>
                      { showAddTask && <AddTask onAdd={ addTask } />  }
                      {
                        (tasks.length > 0) ?
                              <Tasks tasks={ tasks }
                                     onDelete={ deleteTask }
                                     onToggle={ toggleReminder } /> :
                              'No Tasks!'
                      }
                    </>
                  } />
                <Route path='/about' element={ <About /> } />
              </Routes>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
