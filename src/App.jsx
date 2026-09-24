import { useState } from "react";
import "./App.css";
import AuthForm from "./components/AuthForm";
import Chat from "./components/Chat";

function App() {
  const [credentials, setCredentials] = useState(() => {
    const idInstance = localStorage.getItem("idInstance") || "";
    const apiTokenInstance = localStorage.getItem("apiTokenInstance") || "";
    return { idInstance, apiTokenInstance };
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem("idInstance"));
  });

  const handleAuthSuccess = (idInstance, apiTokenInstance) => {
    localStorage.setItem("idInstance", idInstance);
    localStorage.setItem("apiTokenInstance", apiTokenInstance);
    setCredentials({ idInstance, apiTokenInstance });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("idInstance");
    localStorage.removeItem("apiTokenInstance");
    setCredentials({ idInstance: "", apiTokenInstance: "" });
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <AuthForm onAuthSuccess={handleAuthSuccess} />
      ) : (
        <Chat
          idInstance={credentials.idInstance}
          apiTokenInstance={credentials.apiTokenInstance}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
