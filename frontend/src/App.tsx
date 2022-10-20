import React, {useEffect, useState} from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from "./components/Context/UserContext";
import mainRoutes from './routes/main';
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Preloader from './components/Preloader/preloader';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Dashboard = React.lazy(
  () => import('./components/Dashboard/dashboard'),
)

function App() {
  const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {setLoading(false);}, 0);
      }, []);
  return (
    <div className="App">
      <UserContextProvider>
      { loading ? 
        (<Preloader />) 
        : 
        (
            <Router>
              <Header />
            <Routes>
                {mainRoutes.map((prop, key) => {
                    return (
                        <Route
                            path={prop.path}
                            key={key}
                            element={prop.component}
                        ></Route>
                    )
                })}
                <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
            </Routes>
            <Footer />
        </Router>
        ) 
    }
    </UserContextProvider>
    <ToastContainer />
    </div>
  );
}

export default App;
