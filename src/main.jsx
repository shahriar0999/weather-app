import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import './index.css'
import ReactDOM from "react-dom/client";
import { router } from "./Routes";
import Global_Provider from "./Context/Global_Provider";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <Global_Provider>
    <RouterProvider router={router} />
  </Global_Provider>
);
