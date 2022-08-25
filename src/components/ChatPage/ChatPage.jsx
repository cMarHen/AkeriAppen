import React, { useEffect, useState, useContext } from 'react';
import classes from './ChatPage.module.css';
import { fetchChat, postMessage, deleteMessage } from '../../hooks/fetchMessages';
import AuthContext from '../../Context/auth-context';
import ChatMessageList from '../ChatMessageList/ChatMessageList';
import ChatSendMessage from '../ChatSendMessage/ChatSendMessage';
import IsLoadingContext from '../../Context/isLoading-context';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

/**
 * Component of type ChatPage.
 *
 * @returns {JSX} JSX Element.
 */
function ChatPage() {
  const authContext = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(IsLoadingContext);
  const [showFlash, setShowFlash] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showMessagePopup, setShowMessagePopup] = useState(false);

  const handleRemoveMessage = async (id) => {
    const response = await deleteMessage(authContext.token, id);
    if (response === 204) {
      setShowFlash(true);
      setTimeout(() => {
        setShowFlash(false);
      }, 3000);
    }
  };

  const handleSendAction = async ({ textToSend }) => {
    postMessage(authContext.token, authContext.username, textToSend);
    setShowMessagePopup(false);
  };

  const sendMessagePopup = (event) => {
    event.preventDefault();
    setShowMessagePopup(true);
  };

  const sendMessageClosePopup = (event) => {
    event.preventDefault();
    setShowMessagePopup(false);
  };

  useEffect(() => {
    /**
     * Fetch data.
     *
     * @returns {string} -
     */
    async function fetchData() {
      if (messages.length) {
        return;
      }

      setIsLoading(true);
      const data = await fetchChat(authContext.token);
      setMessages(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    !isLoading
      ? (
        <div className={classes.container}>
          {showMessagePopup
          && (
          <div className={classes.sendMessageForm}>
            <div className={classes.chatFormHeader}>
              <h3>Skriv ett meddelande</h3>
              <p>Tänk på vad du skriver, inga personangrepp och så vidare.</p>
              <button className={classes.closeBtn} onClick={sendMessageClosePopup} type="submit">X</button>
            </div>
            <div className={classes.sendMessageComponent}>
              <ChatSendMessage handleAction={handleSendAction} />
            </div>
          </div>
          )}

          {!showMessagePopup
          && (
            <button className={classes.makePost} onClick={sendMessagePopup} type="submit">Gör ett inlägg</button>
          )}
          <div className={classes.ListOfMessages}>
            {showFlash && (
              <div className={classes.showFlash}>
                <p>Meddelandet togs bort</p>
              </div>
            )}
            <ChatMessageList
              isAdmin={authContext.isAdmin}
              messages={messages}
              handleRemoveMessage={handleRemoveMessage}
            />
          </div>
        </div>
      )
      : <LoadingSpinner loadingMessage="Laddar meddelanden ..." />
  );
}

export default ChatPage;
