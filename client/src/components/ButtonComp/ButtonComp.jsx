import { 
  Button
} from "@mui/material";

export const ButtonComp = (props) => {
  return (
    <Button
      type={props.type}
      variant="contained"
      color="secondary"
      onClick={props.onclick}
    >
      {props.name}
    </Button>
  );
};
