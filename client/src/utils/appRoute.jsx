import React from "react";
import { Route, Navigate } from "react-router-dom";

// Extract the required user role from the path
const extractUserRoleFromPath = (path) => {
  if (typeof path === "string") {
    const match = path.match(/^\/([^/]+)/);
    return match ? match[1] : null;
  }
  return null;
};

const PATHS = {
  LOGIN: (role) => `/${role}/login`,
  DASHBOARD: (role, userId) => role === "admin" ? `/${role}/dashboard` : `/${role}/dashboard/${userId}`,
};

const createRouteWrapper = (isLoggedIn, userRole, userId) => {
  const createRoute = (path, Component, isProtected, handleLogin) => {
    const requiredRole = extractUserRoleFromPath(path);

    const element = isLoggedIn && userRole === requiredRole ? 
    (
      isProtected ? (
        // Render the protected component
        <Component userId={userId} userRole={requiredRole} />
      ) : (
        // Redirect to dashboard if logged in with the correct role
        <Navigate to={PATHS.DASHBOARD(requiredRole, userId)} />
      )
    ) : 
    isProtected ? (
      // Redirect to login page if not logged in or incorrect role
      <Navigate to={PATHS.LOGIN(requiredRole)} />
    ) : (
      // Show the login or signup component based on the route
      <Component onLogin={handleLogin} userRole={requiredRole} />
    );

    return <Route path={path} element={element} />;
  };

  return {
    createProtectedRoute: (path, Component) => createRoute(path, Component, true),
    createLoginRoute: (path, Component, handleLogin) => createRoute(path, Component, false, handleLogin),
    createSignupRoute: (path, Component) => createRoute(path, Component, false),
  };
};

export default createRouteWrapper;
