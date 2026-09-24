import { useState, useEffect, useRef } from "react";
import { receiveNotification, deleteNotification } from "../api/greenApi";
import MessageForm from "./MessageForm";

function Chat({ idInstance, apiTokenInstance, onLogout }) {
  const [messages, setMessages] = useState([]);
  const isPolling = useRef(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const poll = async () => {
      if (isPolling.current) return;
      isPolling.current = true;

      try {
        const notification = await receiveNotification(
          idInstance,
          apiTokenInstance,
        );

        if (notification) {
          const { receiptId, body } = notification;

          if (body?.typeWebhook === "incomingMessageReceived") {
            const text = body?.messageData?.textMessageData?.textMessage;
            const sender = body?.senderData?.chatId;

            if (text && sender) {
              setMessages((prev) => [
                ...prev,
                { id: receiptId, text, sender, isMy: false },
              ]);
            }
          }

          await deleteNotification(idInstance, apiTokenInstance, receiptId);
        }
      } catch (err) {
        console.error("Ошибка получения уведомления:", err);
      } finally {
        isPolling.current = false;
      }
    };

    const interval = setInterval(poll, 3000);
    poll();

    return () => clearInterval(interval);
  }, [idInstance, apiTokenInstance]);

  const handleMessageSent = (text) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text, isMy: true },
    ]);
  };

  return (
    <div className="chat">
      <header className="chat-header">
        <div className="chat-title">Telegram Chat</div>
        <button className="logout-btn" onClick={onLogout}>
          Выйти
        </button>
      </header>

      <div className="messages">
        {messages.length === 0 ? (
          <p className="empty">
            Сообщений пока нет. Отправьте первое — введите chatId получателя
            внизу.
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.isMy ? "my" : "their"}`}
            >
              {msg.text}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <MessageForm
        idInstance={idInstance}
        apiTokenInstance={apiTokenInstance}
        onMessageSent={handleMessageSent}
      />
    </div>
  );
}

export default Chat;
