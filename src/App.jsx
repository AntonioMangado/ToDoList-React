import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { v4 as uuidv4 } from 'uuid';
import Card from './components/Card';
import './App.css'

function App() {

  const initialTasks = [
    {title: "Despertarse"},
    {title: "Lavarse los dientes"}
  ]

  const [data, setData] = useState({})
  const [list, setList] = useState(initialTasks) // => [{}, {}, {}]
  const [formValues, setFormValues] = useState({
    title: ""
  });
  const [showButton, setShowButton] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const title = e.target.task.value
    const myTask = {title}

    if (myTask.title.length < 6) {
      alert("Your task should be at least 6 characters long")
      setFormValues({
        title: ""
      })
    } else {
      const confirmed = confirm(`¿Deseas crear esta tarea: ${title}?`)
    if (confirmed)  {
      setData(myTask);
      setList([...list, myTask]);
      setFormValues({
        title: ""
      })
      setShowButton(false);
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false)
      }, 2000)
    }
    }
    
  }

  const deleteTask = (i) => {
    const remainingTasks = list.filter((task, j) => i !== j);
    setList(remainingTasks)
  }

  const clearTasks = () => {
    setList([])
  }
  
  const resetTasks = () => {
    setList(initialTasks)
  }

  const renderTask = () => {
    return list.map((task, i) => (
      <Card
        key={uuidv4()}
        title={task.title}
        deleteTask={() => deleteTask(i)} />)
    )}

  const showAddBtn = () => {
    if ((formValues.title.length) > 1) {
      setShowButton(true);
      // console.log(formValues.title.length)
      // console.log(formValues.title)
    } else {
      setShowButton(false)
    }
  }

  const clearInput = () => {
    setFormValues({
      title: ""
    }),
    setShowButton(false);
  }


  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <form onSubmit={handleSubmit}>
        <h2>Insert your task:</h2>
        <input 
          type="text" 
          name="task" 
          value={formValues.title} 
          onChange={(e) => {
            const input = e.target.value
            setFormValues({...formValues, title: input}), showAddBtn(), setTimeout(clearInput, 20000)}
          }
          />
        {showConfirmation && <div className='cnfm-container'><h3>Task successfully added</h3></div>} 
        {showButton && <div className="btn-container"><button type="submit">ADD</button></div>}
        
         
        
      </form>

      <button onClick={clearTasks} >Clear tasks</button>
      <button onClick={resetTasks}>Reset tasks</button>

      <section>
        <h2>Adult things to do:</h2>
        {renderTask()}
      </section>
    </>
  )
}

export default App
