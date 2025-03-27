import { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import Task from "../Task/Task";
import "./Tasks.css";

function Tasks({ tasks, taskEdit, deleteTask, completeTask }) {
  const [filterTasks, setFilterTasks] = useState([...tasks]);
  const [form, handleChange] = useForm({ category: "Todas" });
  const { category } = form;

  useEffect(() => {
    category === "Todas"
      ? setFilterTasks([...tasks])
      : setFilterTasks(tasks.filter((task) => task.category === category));
  }, [category, tasks]);

  return (
    <div className="main-tasks">
      <p>
        Cantidad de tareas: <span>{filterTasks.length}</span>
      </p>
      <label>Categoria</label>
      <select name="category" id="" onChange={handleChange}>
        <option value="Todas">Todas</option>
        <option value="Personal">Personal</option>
        <option value="Trabajo">Trabajo</option>
        <option value="Estudios">Estudios</option>
        <option value="Deporte">Deporte</option>
        <option value="Entretenimiento">Entretenimiento</option>
        <option value="Otra/s">Otra/s</option>
      </select>
      <div className="container-tasks">
        {filterTasks.length > 0 ? (
          filterTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              taskEdit={taskEdit}
              deleteTask={deleteTask}
              completeTask={completeTask}
            />
          ))
        ) : (
          <p className="category-msg">
            No hay tareas registradas en la categoria de <b>{category}</b>
          </p>
        )}
      </div>
    </div>
  );
}

export default Tasks;
