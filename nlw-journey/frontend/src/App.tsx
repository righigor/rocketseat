import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTripPage from "./pages/create-trip/create-trip";
import TripDeatils from "./pages/trip-details/trip-details";


const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />
  },
  {
    path: "/trips/:tripId",
    element: <TripDeatils />
  }
]);

export default function App() {
  return <RouterProvider router={router} />
}