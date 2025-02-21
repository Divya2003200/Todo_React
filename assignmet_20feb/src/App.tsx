import { TaskProvider } from './Components/TaskContex'
import './App.css'
import TaskManager from './Components/TaskManager'

function App() {
  return (
    <>
      <TaskProvider>
            <TaskManager />
        </TaskProvider>
    </>
  )
}

export default App
