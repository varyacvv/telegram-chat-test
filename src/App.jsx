import { useState } from "react";
import "./App.css";
import AuthForm from "./components/AuthForm";
import MessageForm from "./components/MessageForm";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({
    idInstance: "",
    apiTokenInstance: "",
  });

  const handleAuthSuccess = (idInstance, apiTokenInstance) => {
    localStorage.setItem("idInstance", idInstance);
    localStorage.setItem("apiTokenInstance", apiTokenInstance);
    setCredentials({ idInstance, apiTokenInstance });
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <AuthForm onAuthSuccess={handleAuthSuccess} />
      ) : (
        <MessageForm
          idInstance={credentials.idInstance}
          apiTokenInstance={credentials.apiTokenInstance}
        />
      )}
    </div>
  );
}

export default App;
