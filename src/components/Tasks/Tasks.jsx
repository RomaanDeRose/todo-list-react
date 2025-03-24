import Task from "../Task/Task";
import "./Tasks.css";

function Tasks({ tasks, taskEdit, deleteTask, completeTask }) {
  return (
    <>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          taskEdit={taskEdit}
          deleteTask={deleteTask}
          completeTask={completeTask}
        />
      ))}
    </>
  );
}

export default Tasks;
