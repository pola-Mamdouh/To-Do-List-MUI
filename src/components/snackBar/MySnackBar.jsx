import { Snackbar,Alert } from "@mui/material"
const MySnackBar = ({open, massage}) => {
  return (
<Snackbar open={open} autoHideDuration={3000}>
  <Alert
    severity="success"
    variant="filled"
    sx={{ width: '100%' }}
  >
    {massage}
  </Alert>
</Snackbar>
  )
}

export default MySnackBar