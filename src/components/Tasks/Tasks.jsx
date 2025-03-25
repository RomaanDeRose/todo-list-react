import Task from "../Task/Task";
import "./Tasks.css";

function Tasks({ tasks, taskEdit, deleteTask, completeTask }) {
  return (
    <div className="main-tasks">
      <p>
        Cantidad de tareas: <span>{tasks.length}</span>
      </p>
      <div className="container-tasks">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            taskEdit={taskEdit}
            deleteTask={deleteTask}
            completeTask={completeTask}
          />
        ))}
      </div>
    </div>
  );
}

export default Tasks;
