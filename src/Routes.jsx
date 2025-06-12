import { createBrowserRouter } from "react-router";
import Root from "./Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    // errorElement:<Error></Error>,
    // children: [
    //     {
    //         path:"/",
    //         element:<p>I am home</p>
    //     }
    // ]
  },
]);