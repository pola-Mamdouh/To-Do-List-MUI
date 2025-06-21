import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grow, Zoom, Backdrop } from "@mui/material";
import styles from "./UpdateModel.module.css";

const UpdateModel = ({ modelIpts, handelModelInput, onClose, onSave }) => {
  const handleClose = () => {
    if (document.activeElement) {
      document.activeElement.blur();
    }
    onClose();
  };

  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={true}
      onClick={handleClose}
    >
      <Grow in={true} timeout={400} style={{ transformOrigin: "center" }}>
        <div
          className={styles.modalContainer}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          <form
            className={styles.modalForm}
            onSubmit={(event) => {
              event.preventDefault();
              onSave();
            }}
          >
            <Zoom in={true} timeout={500}>
              <TextField
                className={styles.inputField}
                label="Task Title"
                variant="filled"
                size="small"
                fullWidth
                value={modelIpts.title}
                name="title"
                onChange={handelModelInput}
              />
            </Zoom>
            <Zoom in={true} timeout={600}>
              <TextField
                className={styles.inputField}
                label="Task Details"
                variant="filled"
                size="small"
                fullWidth
                value={modelIpts.desc}
                name="desc"
                onChange={handelModelInput}
              />
            </Zoom>
            <div className={styles.buttonGroup}>
              <Zoom in={true} timeout={700}>
                <Button
                  className={styles.saveButton}
                  type="submit"
                  variant="contained"
                  fullWidth
                >
                  Save
                </Button>
              </Zoom>
              <Zoom in={true} timeout={800}>
                <Button
                  className={styles.cancelButton}
                  variant="outlined"
                  fullWidth
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Zoom>
            </div>
          </form>
        </div>
      </Grow>
    </Backdrop>
  );
};

export default UpdateModel;
