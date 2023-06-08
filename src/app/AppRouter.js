import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { publicRoutes } from "./routes";

const AppRouter = () => {
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) => {
                return <Route key={path} path={path} element={<Component/>} />
            })}
        </Routes>
    );
};

export default AppRouter;
