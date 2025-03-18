import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Tasks from "./components/Tasks";

import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Personal");
  const [priority, setPriority] = useState("Alta");

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "" || description.trim() === "") {
      toast.error("Por favor, complete todos los campos");
      return;
    }

    const newTask = {
      id: Math.round(Math.random() * 100000, 2),
      title: title,
      description: description,
      category: category,
      priority: priority,
      completed: false,
    };
    console.log(newTask);
    setTasks([...tasks, newTask]);

    setTitle("");
    setDescription("");
    setCategory("Personal");
    setPriority("Alta");

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
    setEditTitle(taskEdit[0].title);
    setEditDescription(taskEdit[0].description);

    setEditTask(taskEdit);
  };

  const updateTask = (id) => {
    if (editTitle.trim() === "" || editDescription.trim() === "") {
      toast.error("Por favor, complete todos los campos");
      return;
    }

    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.title = editTitle;
        task.description = editDescription;
      }
      return task;
    });
    setTasks(newTasks);

    toast.success("Tarea actualizada correctamente");

    setShowEditForm(!showEditForm);
  };

  const completeTask = (e, id) => {
    if (e.target.checked) {
      toast("Tarea completada correctamente", {
        style: {
          backgroundColor: "#00da02",
          color: "#fff",
        },
      });
    }
    const newTasks = tasks.map((task) => {
      task.id === id ? (task.completed = !task.completed) : null;
      return task;
    });

    setTasks(newTasks);
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
                type="text"
                placeholder="Escriba el nuevo título..."
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Descripción</label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="4"
                placeholder="Escriba la descripción..."
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
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
                type="text"
                placeholder="Escriba su tarea..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Descripción</label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="4"
                placeholder="Escriba la descripción..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="">Categoria</label>
              <select
                name=""
                id=""
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
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
              <select
                name=""
                id=""
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
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
      {tasks.length > 0 ? (
        <div className="container-tasks">
          <p>
            Cantidad de tareas: <span>{tasks.length}</span>
          </p>
          <Tasks
            tasks={tasks}
            taskEdit={taskEdit}
            deleteTask={deleteTask}
            completeTask={completeTask}
          />
        </div>
      ) : (
        <p className="task-msg">No hay tareas registradas...</p>
      )}
    </div>
  );
}

export default App;
