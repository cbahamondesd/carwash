import { 
  Button
} from "@mui/material";

export const ButtonSecondary = (props) => {
  return (
    <Button
      type={props.type}
      variant="contained"
      size="small"
      color="terciary"
      onClick={props.onClick}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {props.name}
    </Button>
  );
};
