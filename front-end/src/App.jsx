import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayouts';
import Home from './pages/Home';
import Login from './pages/login';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/login"
        element={
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;
