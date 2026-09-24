import { useState } from "react";
import { sendMessage } from "../api/greenApi";

function MessageForm({ idInstance, apiTokenInstance, onMessageSent }) {
  const [chatId, setChatId] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus("");
    setIsLoading(true);

    try {
      await sendMessage(idInstance, apiTokenInstance, chatId, message);
      onMessageSent(message);
      setMessage("");
    } catch (err) {
      console.error("Ошибка отправки:", err);
      const statusCode = err?.response?.status;
      if (statusCode === 401) {
        setStatus("Неверные ключи доступа.");
      } else if (statusCode === 466) {
        setStatus("Инстанс выключен или превышен лимит.");
      } else {
        setStatus("Не удалось отправить. Проверьте chatId и соединение.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        className="chat-id-input"
        type="text"
        placeholder="Кому (chatId)"
        value={chatId}
        onChange={(e) => setChatId(e.target.value)}
        required
      />

      <div className="input-row">
        <textarea
          className="message-input"
          placeholder="Введите сообщение..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button
          className="send-btn"
          type="submit"
          disabled={isLoading || !message.trim()}
        >
          {isLoading ? "..." : "➤"}
        </button>
      </div>

      {status && <p className="status">{status}</p>}
    </form>
  );
}

export default MessageForm;
