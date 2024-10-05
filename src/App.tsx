import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import DocsPage from "./pages/DocsPage";
import VehiclePage from "./pages/VehiclePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/vehicle" element={<VehiclePage />} />
          <Route path="/docs" element={<DocsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
