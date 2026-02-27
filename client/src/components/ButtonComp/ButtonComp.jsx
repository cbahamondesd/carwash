import { 
  Button
} from "@mui/material";

export const ButtonComp = (props) => {
  return (
    <Button
      type={props.type}
      variant="contained"
      size="small"
      color="primary"
      onClick={props.onClick}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {props.name}
    </Button>
  );
};
