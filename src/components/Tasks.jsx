import "./Tasks.css";
import MapTask from './MapTask'
function Tasks({ tasks,handleUpdateBtn,handlDeleteBtn, handleDoneTask,toggleTaskCompletion}) {
  return (
    <div className="tasks-container">
      <div className="tasks-grid">
        {tasks.map((task) => (
          <MapTask key={task.id} task={task} toggleTaskCompletion={toggleTaskCompletion} handleUpdateBtn={handleUpdateBtn} handlDeleteBtn={handlDeleteBtn} handleDoneTask={handleDoneTask}/>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
