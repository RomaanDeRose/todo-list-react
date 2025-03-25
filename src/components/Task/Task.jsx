import "./Task.css";

function Task({ task, taskEdit, deleteTask, completeTask }) {
  return (
    <div
      key={task.id}
      className={`task ${task.completed ? "checked" : "no-checked"}`}
    >
      <div className="header-task">
        <h3>{task.title}</h3>
        <div className="task-info">
          <span className={`category ${task.category.toLowerCase()}`}>
            {task.category}
          </span>
          <span
            style={{ marginLeft: "0.35rem" }}
            className={`priority ${task.priority.toLowerCase()}`}
          >
            {task.priority}
          </span>
        </div>
      </div>
      <p className="task-description">{task.description}</p>
      <div className="task-actions">
        <input
          type="checkbox"
          name=""
          id=""
          checked={task.completed}
          onChange={(e) => completeTask(e, task.id)}
        />
        <div className="checked-task"></div>
        <div>
          <button
            style={{ visibility: task.completed ? "hidden" : null }}
            className="button task-edit"
            onClick={() => taskEdit(task.id)}
          >
            Editar
          </button>
          <button
            className="button task-delete"
            onClick={() => deleteTask(task.id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Task;
