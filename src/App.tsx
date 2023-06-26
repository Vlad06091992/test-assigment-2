import React from 'react';
import {Photos} from "./../src/features/photos/Photos";
import {Posts} from "./../src/features/posts/Posts";
import {Todos} from "./../src/features/todos/Todos";
import {createHashRouter, RouterProvider} from "react-router-dom";
import {Root} from "./features/root/Root";


export const router = createHashRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: 'photos',
                element: <Photos />,
            },
            {
                path: 'posts',
                element: <Posts />,
            },
            {
                path: 'todos',
                element: <Todos />,
            },]
    }])


function App() {
    return (
        <div >
         <RouterProvider router={router}/>
        </div>
    );
}

export default App;
