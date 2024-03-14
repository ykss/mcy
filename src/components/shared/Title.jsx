import Typography from "@mui/material/Typography";

const Title = ({ children }) => {
  return (
    <>
      <Typography variant="h5">{children}</Typography>
    </>
  );
};

export default Title;
