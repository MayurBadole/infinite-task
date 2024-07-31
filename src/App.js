import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import WeatherListHistory from "./components/History";
import WeatherData from "./Weather";

import { useState } from "react";

function App() {
  <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<WeatherData />}></Route>
        <Route path="/history" element={<WeatherListHistory />}></Route>
        <Route path="*" element={<>page not found</>}></Route>
      </Routes>
    </div>
  </Router>;
}

export default App;
