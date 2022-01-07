import React, { FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import RegistrationPage from "../RegistrationForm/RegistrationPage";
import NotFound from "./NotFound";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import ProfilePage from "../Profile/ProfilePage";

const LoginPage = React.lazy(() => import("../LoginForm/LoginPage"));

export const Roots: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route
        path="/login"
        element={
          <Suspense
            fallback={
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            }
          >
            <LoginPage />
          </Suspense>
        }
      />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Roots;
