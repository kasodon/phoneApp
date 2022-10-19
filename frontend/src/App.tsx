import React, {useEffect, useState} from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import mainRoutes from './routes/main';
import Preloader from './components/Preloader/preloader';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {setLoading(false);}, 0);
      }, []);
  return (
    <div className="App">
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
            </Routes>
            <Footer />
        </Router>
        ) 
    }
    <ToastContainer />
    </div>
  );
}

export default App;
