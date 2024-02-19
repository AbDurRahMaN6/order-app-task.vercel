import "./App.css";
import Header from "./components/header/header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Table from "./components/details/details";
import { useEffect, useState } from 'react';
import Form from "./components/form";

function App() {
  const [rowss, setRows] = useState([]);
  const addRow = (formData) => {
    setRows([...rowss, formData]);
  };
  return (
    <div className="App">
      <div className="container">
        <div className="card mt-5">
          <div className="card-body">
            <Header />
            <Router>
              <Routes>
                <Route exact path="/" element={<Table rows={rowss} />} />
                <Route
                  path="/create-new"
                  element={<Form addRow={addRow} />}
                />
              </Routes>
            </Router>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
