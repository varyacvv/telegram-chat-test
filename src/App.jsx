import { useState } from "react";
import "./App.css";
import AuthForm from "./components/AuthForm";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = (idInstance, apiTokenInstance) => {
    localStorage.setItem("idInstance", idInstance);
    localStorage.setItem("apiTokenInstance", apiTokenInstance);
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <AuthForm onAuthSuccess={handleAuthSuccess} />
      ) : (
        <div>
          <h1>Добро пожаловать!</h1>
        </div>
      )}
    </div>
  );
}

export default App;
