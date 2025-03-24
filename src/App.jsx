import React, { useState, useEffect } from "react";
import { useForm } from "./hooks/useForm";
import toast, { Toaster } from "react-hot-toast";
import Tasks from "./components/Tasks/Tasks";

import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(false);

  const [form, handleChange, resetForm] = useForm({
    title: "",
    description: "",
    category: "Personal",
    priority: "Alta",
  });
  const { title, description, category, priority } = form;

  const [formEdit, handleChangeEdit, resetFormEdit, actualizeForm] = useForm({
    editTitle: "",
    editDescription: "",
  });
  const { editTitle, editDescription } = formEdit;

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

    setTasks([...tasks, newTask]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));

    resetForm();

    toast.success("Tarea agregada correctamente");
    setShowForm(!showForm);
  };

  const cancelTask = () => {
    setShowForm(!showForm);
    resetForm();
  };

  const cancelEditTask = () => {
    setShowEditForm(!showEditForm);
    resetFormEdit();
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);

    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));

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
    actualizeForm({
      editTitle: taskEdit[0].title,
      editDescription: taskEdit[0].description,
    });

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
    localStorage.setItem("tasks", JSON.stringify(newTasks));

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
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  useEffect(() => {
    const allTasks = JSON.parse(localStorage.getItem("tasks"));
    allTasks ? setTasks(allTasks) : setTasks([]);
  }, []);

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
                name="editTitle"
                type="text"
                placeholder="Escriba el nuevo título..."
                value={editTitle}
                onChange={handleChangeEdit}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Descripción</label>
              <textarea
                name="editDescription"
                id=""
                cols="30"
                rows="4"
                placeholder="Escriba la descripción..."
                value={editDescription}
                onChange={handleChangeEdit}
              ></textarea>
            </div>
            <div className="buttons">
              <button onClick={cancelEditTask}>Cancelar</button>
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
                name="title"
                type="text"
                placeholder="Escriba su tarea..."
                value={title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Descripción</label>
              <textarea
                name="description"
                id=""
                cols="30"
                rows="4"
                placeholder="Escriba la descripción..."
                value={description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="">Categoria</label>
              <select
                name="category"
                id=""
                value={category}
                onChange={handleChange}
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
                name="priority"
                id=""
                value={priority}
                onChange={handleChange}
              >
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>

            <div className="buttons">
              <button onClick={cancelTask}>Cancelar</button>
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
