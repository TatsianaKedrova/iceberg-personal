import React from "react";
import { Button, ButtonProps } from "@mui/material";
import logIn from "../assets/logIn.svg";

const ButtonCommon: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      startIcon={<img src={logIn} alt="logo" style={{ marginRight: "8px" }} />}
      variant="contained"
      type="submit"
      sx={{
        backgroundColor: "primary.main",
        borderRadius: "90px",
        width: "130px",
        height: "48px",
        fontFamily: "Inter",
        fontWeight: 700,
        fontSize: "16px",
        lineHeight: "24px",
        color: "neutral.main",
        textTransform: "none",
        "& .MuiButton-root.Mui-disabled": {
          backgroundColor: "primary.light",
          color: "neutral.main",
        },
      }}
      {...props}
    />
  );
};

export default ButtonCommon;
