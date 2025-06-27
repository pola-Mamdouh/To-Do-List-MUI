import { useState, useMemo, useEffect, useReducer } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ButtonGroup, FormControlLabel, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Switch from '@mui/material/Switch';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Tasks from "./components/Tasks";
import "./App.css";
import UpdateModel from "./components/updateModel/UpdateModel";
import CompletedTasks from "./components/completedTasks/CompletedTasks";
import NotCompleted from "./components/notCompleted/NotCompleted";
import {v4 as uuidv4} from 'uuid'
import MySnackBar from "./components/snackBar/MySnackBar";
import TasksReducer from "./reducers/TasksReducer";
function App() {

  // Initialize tasks from localStorage if available
  const getInitialTasks = () => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  };
  const [tasks, dispatch] = useReducer(TasksReducer, [], getInitialTasks);
  const [taskInputs, setTaskInputs] = useState({
    title: "",
    desc: "",
    isCompleted: false,
  });
  const [activeBtnId, setActiveBtnId] = useState(1);
  const [updateModel, setUpdateModel] = useState(false);
  const [modelIpts, setModelInpts] = useState({
    title: "",
    desc: "",
    id: null,
  });
  const [mode, setMode] = useState("light");

  useEffect(() => {
    document.body.classList.toggle("dark", mode === "dark");
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: {
                  default: "#f5f5f5",
                  paper: "#fff",
                },
              }
            : {
                background: {
                  default: "#18191a",
                  paper: "#23272f",
                },
                text: {
                  primary: "#fff",
                  secondary: "#b0b3b8",
                },
              }),
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
              },
            },
          },
          MuiContainer: {
            styleOverrides: {
              root: {
                background: mode === "light" ? "#f5f5f5" : "#18191a",
                minHeight: "100vh",
                transition: "background 0.3s",
              },
            },
          },
        },
      }),
    [mode]
  );

  const buttons = [
    { id: 1, name: "All Tasks", path: "/" },
    { id: 2, name: "Completed", path: "/completed" },
    { id: 3, name: "Not Completed", path: "/notCompleted" },
  ];
  const handleAddTask = () => {
    if (!taskInputs.title || !taskInputs.desc) return;

    dispatch({type: "added", payload: {newTaskTitle: taskInputs.title, newTaskDesc: taskInputs.desc}})

    setTaskInputs({ title: "", desc: "", isCompleted: false });
    handleSnackBar("Added successfully")
  };

  const toggleTaskCompletion = (id) => {
    dispatch({ type: "toggleDoneBtn", payload: { taskId: id } });
  };

  const handleUpdateBtn = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setModelInpts({ ...task });
    setUpdateModel(true);
    
  };

  const handelModelInput = (event) => {
    const { name, value } = event.target;
    setModelInpts((prev) => ({ ...prev, [name]: value }));
  };

  const handelSaveUpdateChanges = () => {
    if (!modelIpts.title || !modelIpts.desc) return;

    dispatch({
      type: "updated",
      payload: {
        id: modelIpts.id,
        title: modelIpts.title,
        desc: modelIpts.desc,
      },
    });

    setUpdateModel(false);
    setModelInpts({ title: "", desc: "", id: null });
    handleSnackBar("Updated successfully");
  };

  const handlDeleteBtn = (taskId) => {
    dispatch({type: 'deleted' ,payload : {taskId} })
    handleSnackBar("Deleted successfully")
  };

  const handleDoneTask = (taskId) => {

    dispatch({type: "done", payload: {taskId}})
  };
  const [massage , setMassage]  = useState("");
  const [open, setOpen] = useState(false)
  const handleSnackBar = (massage) => {
    setOpen(true)
    setMassage(massage)
    setTimeout(() => {setOpen(false)}, 2000)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <div className={`toDoList${mode === "dark" ? " dark" : ""}`}>
        <Container maxWidth="lg">
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: 16 }}>
            <Switch
              checked={mode === "dark"}
              onChange={() => setMode(mode === "light" ? "dark" : "light")}
              color="primary"
              icon={<LightModeIcon sx={{ color: '#1565c0', bgcolor: '#fff', borderRadius: '50%', fontSize: 28, boxShadow: 1 }}/>} 
              checkedIcon={<DarkModeIcon sx={{ color: '#1565c0', bgcolor: '#fff', borderRadius: '50%', fontSize: 28, boxShadow: 1 }}/>} 
            />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddTask();
            }}
          >
            <div className="inputs flex-center">
              <TextField
                label="Task Title"
                variant="filled"
                size="small"
                style={{ width: "200px" }}
                value={taskInputs.title}
                onChange={(e) =>
                  setTaskInputs({ ...taskInputs, title: e.target.value })
                }
              />
              <TextField
                label="Task Details"
                variant="filled"
                size="small"
                style={{ width: "300px" }}
                value={taskInputs.desc}
                onChange={(e) =>
                  setTaskInputs({ ...taskInputs, desc: e.target.value })
                }
              />
              <Button type="submit" variant="contained" size="large">
                Add
              </Button>
            </div>
          </form>

          <div className="navigation flex-center">
            <ButtonGroup variant="outlined">
              {buttons.map(({ id, name, path }) => (
                <Link to={path} key={id} style={{ textDecoration: "none" }}>
                  <Button
                    variant={id === activeBtnId ? "contained" : "outlined"}
                    onClick={() => setActiveBtnId(id)}
                  >
                    {name}
                  </Button>
                </Link>
              ))}
            </ButtonGroup>
          </div>

          <Routes>
            <Route
              path="/"
              element={
                <Tasks
                  tasks={tasks}
                  handleUpdateBtn={handleUpdateBtn}
                  handlDeleteBtn={handlDeleteBtn}
                  handleDoneTask={handleDoneTask}
                  toggleTaskCompletion={toggleTaskCompletion}
                />
              }
            />
            <Route
              path="/completed"
              element={
                <CompletedTasks
                  tasks={tasks}
                  handleUpdateBtn={handleUpdateBtn}
                  handlDeleteBtn={handlDeleteBtn}
                  handleDoneTask={handleDoneTask}
                  toggleTaskCompletion={toggleTaskCompletion}
                />
              }
            />
            <Route
              path="/notCompleted"
              element={
                <NotCompleted
                  tasks={tasks}
                  handleUpdateBtn={handleUpdateBtn}
                  handlDeleteBtn={handlDeleteBtn}
                  handleDoneTask={handleDoneTask}
                  toggleTaskCompletion={toggleTaskCompletion}
                />
              }
            />
          </Routes>
          {updateModel && (
            <UpdateModel
              modelIpts={modelIpts}
              handelModelInput={handelModelInput}
              onSave={handelSaveUpdateChanges}
              onClose={() => {
                setUpdateModel(false);
                setModelInpts({ title: "", desc: "", id: null });
              }}
            />
          )}
        </Container>
        <MySnackBar open={open}  massage={massage}/>
      </div>
    </ThemeProvider>
  );
}

export default App;
