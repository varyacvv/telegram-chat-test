import { useState } from "react";
import { checkAuth } from "../api/greenApi";

function AuthForm({ onAuthSuccess }) {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await checkAuth(idInstance, apiTokenInstance);
      onAuthSuccess(idInstance, apiTokenInstance);
    } catch (err) {
      console.error("Ошибка авторизации:", err);

      const status = err?.response?.status;

      if (status === 401) {
        setError("Неверные ключи доступа. Проверьте idInstance и apiTokenInstance.");
      } else if (status === 429) {
        setError("Слишком много запросов. Подождите немного.");
      } else {
        setError("Ошибка соединения. Проверьте интернет и попробуйте снова.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Вход в Telegram Chat</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="idInstance"
          value={idInstance}
          onChange={(e) => setIdInstance(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="apiTokenInstance"
          value={apiTokenInstance}
          onChange={(e) => setApiTokenInstance(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Проверяем..." : "Войти"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default AuthForm;
