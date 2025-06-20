import "./Tasks.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { Fade, Grow, Zoom, Collapse } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

function MapTask({ task, handleUpdateBtn, handlDeleteBtn, toggleTaskCompletion }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element when component mounts
    audioRef.current = new Audio();
    audioRef.current.src = "mixkit-paper-slide-1530.wav";
    audioRef.current.volume = 0.5;
  }, []);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      handlDeleteBtn(task.id);
    }, 300);
  };

  const handleTaskCompletion = () => {
    if (!task.isCompleted && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.log("Audio playback failed:", error);
      });
    }
    toggleTaskCompletion(task.id);
  };

  return (
    <Collapse in={!isDeleting} timeout={300}>
      <Grow in={true} timeout={500}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`task-card ${task.isCompleted ? 'completed' : ''}`}
        >
          <Fade in={true} timeout={800}>
            <div>
            <Zoom in={true} timeout={500}>
              <h4 className={`task-title ${task.isCompleted ? 'completed' : ''}`}>
                {task.title}
              </h4>
            </Zoom>
            <Zoom in={true} timeout={500}>
              <p className={`task-description ${task.isCompleted ? 'completed' : ''}`}>
                {task.desc}
              </p>
              </Zoom>
              {task.isCompleted && (
                <Zoom in={true} timeout={500}>
                  <span className="date">{task.completedTime}</span>
                </Zoom>
              )}
            </div>
          </Fade>
          <div className="btns">
            <Zoom in={true} timeout={300}>
              <IconButton
                onClick={handleDelete}
                aria-label="delete"
                size="large"
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Zoom>
            <Zoom in={true} timeout={400}>
              <IconButton
                onClick={() => handleUpdateBtn(task.id)}
                aria-label="edit"
                size="large"
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
            </Zoom>
            <Zoom in={true} timeout={500}>
              <IconButton
                onClick={handleTaskCompletion}
                style={
                  task.isCompleted
                    ? { background: "rgba(46, 204, 113, 1)", color: "#fff" }
                    : null
                }
                aria-label="done"
                size="large"
              >
                <DoneIcon fontSize="inherit" />
              </IconButton>
            </Zoom>
          </div>
        </motion.div>
      </Grow>
    </Collapse>
  );
}

export default MapTask;
