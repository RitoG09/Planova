import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewTrip from "./pages/new-trip/NewTrip.jsx";
import Header from "./components/custom/Header.jsx";
import SignIn from "./pages/signin/SignIn.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import ProtectedRoute from "./components/routetype/ProtectedRoute.jsx";
import TripHistory from "./pages/trip-history/TripHistory.jsx";
import ViewTrip from "./pages/view-trip/[tripId]/ViewTrip.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <App />
      </>
    ),
  },
  {
    path: "/new-trip",
    element: (
      <ProtectedRoute>
        <>
          <Header />
          <NewTrip />
        </>
      </ProtectedRoute>
    ),
  },
  {
    path: "/trip-history",
    element: (
      <ProtectedRoute>
        <>
          <Header />
          <TripHistory />
        </>
      </ProtectedRoute>
    ),
  },
  {
    path: "/view-trip/:tripId",
    element: (
      <ProtectedRoute>
        <>
          {/* <Header /> */}
          <ViewTrip />
        </>
      </ProtectedRoute>
    ),
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
