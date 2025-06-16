import MapTask from "../MapTask";
function CompletedTasks({
  tasks,
  handleUpdateBtn,
  handlDeleteBtn,
  handleDoneTask,
  toggleTaskCompletion
}) {
  return (
    <div className="tasks-container">
      <div className="tasks-grid">
        {tasks.map((task) =>
          task.isCompleted ? (
            <MapTask key={task.id} toggleTaskCompletion={toggleTaskCompletion} task={task} handleUpdateBtn={handleUpdateBtn} handlDeleteBtn={handlDeleteBtn} handleDoneTask={handleDoneTask}/>
          ) : (
            null
          )
        )}
      </div>
    </div>
  );
}

export default CompletedTasks;
