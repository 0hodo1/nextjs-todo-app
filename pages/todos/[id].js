import { Grid } from "@mui/material";

const TodoDetail = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sstyle={{ minHeight: "100vh" }}
    >
      <Grid item xs={12}>
        <h1>Todo Detail</h1>
      </Grid>
    </Grid>
  );
};
export default TodoDetail;
