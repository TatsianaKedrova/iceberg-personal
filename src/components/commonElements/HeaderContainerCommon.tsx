import React from "react";
import { Box } from "@mui/material";
import { formStyles } from "../LoginForm/formStyles.styles";
import logoIceberg from "../assets/logoIceberg.svg";

type HeaderContainerCommonPropsType = {};

const HeaderContainerCommon: React.FC<HeaderContainerCommonPropsType> = ({
  children,
}) => {
  return (
    <Box sx={formStyles.logoContainer}>
      <Box sx={formStyles.logoSignStyle}>
        <img src={logoIceberg} alt="Iceberg logo"/>
      </Box>
      {children}
    </Box>
  );
};

export default HeaderContainerCommon;
