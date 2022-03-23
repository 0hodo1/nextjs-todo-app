import { Button, TextField, Typography } from "@mui/material";

const TodoForm = () => {
  return (
    <div>
      <Typography
        variant="h5"
        color="darkgrey"
        sx={{ mt: 3, fontWeight: "bold" }}
        gutterBottom
      >
        Add New Todo
      </Typography>
      <TextField fullWidth label="Title" margin="normal"></TextField>
      <TextField
        fullWidth
        label="Description"
        margin="normal"
        multiline
        maxRows
      ></TextField>
      <Button variant="outlined" sx={{ mt: 3 }} color="success">
        Add Todo
      </Button>
    </div>
  );
};
export default TodoForm;
