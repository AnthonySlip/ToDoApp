

import DoneTask from './components/DoneTask';
import InputTask from './components/InputTask';
import Task from './components/Task';
import { useTaskStore } from './stores/store';
import './styles/app.scss';



function App() {
  const tasks = useTaskStore((state) => state.tasks)
  const doneTask = useTaskStore((state) => state.doneTasks)

  return (
    <div className="app">
      <div className="app__contaniner _contaniner">
        <div className="app__body">
          <h1 className="app__title">ToDo App</h1>
          <InputTask/>
          <div className="app__tasks">
            {tasks.map((item, index) => <Task key={index} data={item}/>)}
            {doneTask.map((item, index) => <DoneTask key={index} data={item}/>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
