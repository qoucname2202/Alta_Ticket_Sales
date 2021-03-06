import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { customRoute, privateRoute, publicRoute } from './routes/routes';
import PrivateRoute from './routes/PrivateRoute';
import AdminFilterTicketTemplate from './template/AdminFilterTicketTemplate';
function App() {
  return (
    <div className='app'>
      <Routes>
        {privateRoute?.map((route, index) => {
          let Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <PrivateRoute>
                  <Page />
                </PrivateRoute>
              }
            />
          );
        })}
        {publicRoute?.map((route, index) => {
          let Page = route.component;
          return <Route key={index} path={route.path} element={<Page />} />;
        })}
        {customRoute?.map((route, index) => {
          let Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <AdminFilterTicketTemplate>
                  <Page />
                </AdminFilterTicketTemplate>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
