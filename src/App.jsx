import React, { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(false);
  const taskTitle = useRef(null);
  const taskDescription = useRef(null);
  const taskEditTitle = useRef(null);
  const taskEditDescription = useRef(null);
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
      completed: false,
    };
    setTasks([...tasks, newTask]);
    taskTitle.current.value = "";
    taskDescription.current.value = "";
    taskCategory.current.value = "Personal";
    taskPriority.current.value = "Alta";
    toast.success("Tarea agregada correctamente");
    setShowForm(!showForm);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);

    setTasks(newTasks);
    toast("Tarea eliminada correctamente", {
      style: {
        backgroundColor: "#dd0000",
        color: "#fff",
      },
    });
  };

  const taskEdit = (id) => {
    setShowEditForm(!showEditForm);

    const taskEdit = tasks.filter((task) => task.id === id);
    setEditTask(taskEdit);

    taskEditTitle.current.value = taskEdit.title;
    taskEditDescription.current.value = taskEdit.description;
  };

  const updateTask = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.title = taskEditTitle.current.value;
        task.description = taskEditDescription.current.value;
      }
      return task;
    });
    setTasks(newTasks);

    toast.success("Tarea actualizada correctamente");

    setShowEditForm(!showEditForm);
  };

  return (
    <div className="container">
      <Toaster toastOptions={{ duration: 1500 }} />
      <h1>Todo list App</h1>
      {showEditForm && (
        <div className="container-form">
          <form onSubmit={handleSubmit} className="form" action="">
            <div className="form-group">
              <label htmlFor="" style={{ fontSize: "1.35rem" }}>
                Nuevo Título
              </label>
              <input
                ref={taskEditTitle}
                type="text"
                placeholder="Escriba el nuevo título..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Descripción</label>
              <textarea
                ref={taskEditDescription}
                name=""
                id=""
                cols="30"
                rows="4"
                placeholder="Escriba la descripción..."
              ></textarea>
            </div>
            <div className="buttons">
              <button onClick={() => setShowEditForm(!showEditForm)}>
                Cancelar
              </button>
              <button type="submit" onClick={() => updateTask(editTask[0].id)}>
                Actualizar
              </button>
            </div>
          </form>
        </div>
      )}
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
                <option value="Otra/s">Otra</option>
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
                <input type="checkbox" name="" id="" />
                <div>
                  <button
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
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
