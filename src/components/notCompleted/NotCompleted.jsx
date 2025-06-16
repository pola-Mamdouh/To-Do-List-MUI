
import MapTask from "../MapTask";
function NotCompleted({ tasks,handleUpdateBtn,handlDeleteBtn, handleDoneTask,toggleTaskCompletion}) {
  return (
    <div className="tasks-container">
      <div className="tasks-grid">
        {tasks.map((task) => task.isCompleted ? null : (
          <MapTask key={task.id} toggleTaskCompletion={toggleTaskCompletion} task={task} handleUpdateBtn={handleUpdateBtn} handlDeleteBtn={handlDeleteBtn} handleDoneTask={handleDoneTask}/>
        ))}
      </div>
    </div>
  );
}

export default NotCompleted;
