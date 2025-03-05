import React, { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const taskTitle = useRef(null);
  const taskDescription = useRef(null);
  const taskCategory = useRef(null);
  const taskPriority = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      taskTitle.current.value.trim() === "" ||
      taskDescription.current.value.trim() === ""
    ) {
      toast.error("Por favor, complete todos los campos");
      return;
    }
    const newTask = {
      id: Math.round(Math.random() * 10000, 2),
      title: taskTitle.current.value,
      description: taskDescription.current.value,
      category: taskCategory.current.value,
      priority: taskPriority.current.value,
    };
    setTasks([...tasks, newTask]);
    taskTitle.current.value = "";
    taskDescription.current.value = "";
    taskCategory.current.value = "Personal";
    taskPriority.current.value = "Alta";
    toast.success("Tarea agregada correctamente");
    setShowForm(!showForm);
  };
  console.log(tasks);

  return (
    <div className="container">
      <Toaster />
      <h1>Todo list App</h1>
      {!showForm && (
        <button
          className={showForm ? "todo-button close" : "todo-button"}
          onClick={() => setShowForm(!showForm)}
        >
          Agregar tarea
        </button>
      )}
      {showForm && (
        <div className="container-form">
          <form onSubmit={handleSubmit} className="form" action="">
            <div className="form-group">
              <label htmlFor="" style={{ fontSize: "1.35rem" }}>
                Nueva Tarea
              </label>
              <input
                ref={taskTitle}
                type="text"
                placeholder="Escriba su tarea..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Descripción</label>
              <textarea
                ref={taskDescription}
                name=""
                id=""
                cols="30"
                rows="4"
                placeholder="Escriba la descripción..."
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="">Categoria</label>
              <select ref={taskCategory} name="" id="">
                <option value="Personal">Personal</option>
                <option value="Trabajo">Trabajo</option>
                <option value="Estudios">Estudios</option>
                <option value="Deporte">Deporte</option>
                <option value="Entretenimiento">Entretenimiento</option>
                <option value="Otra/s">Otra/s</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="">Prioridad</label>
              <select ref={taskPriority} name="" id="">
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>

            <div className="buttons">
              <button onClick={() => setShowForm(!showForm)}>Cancelar</button>
              <button type="submit">Agregar</button>
            </div>
          </form>
        </div>
      )}
      {tasks.length > 0 && (
        <div className="container-tasks">
          {tasks.map((task) => (
            <div key={task.id} className="task">
              <div className="header-task">
                <h3>{task.title}</h3>
                <div className="task-info">
                  <span className="category">{task.category}</span>
                  <span style={{ marginLeft: "0.35rem" }} className="priority">
                    {task.priority}
                  </span>
                </div>
              </div>
              <p className="task-description">{task.description}</p>
              <div className="task-actions">
                <input type="checkbox" name="" id="" />
                <div>
                  <button className="task-edit">Editar</button>
                  <button className="task-delete">Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
