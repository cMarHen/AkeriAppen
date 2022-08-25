import React, {
  useState,
  useContext,
  useEffect
} from 'react';

import {
  deleteNews,
  fetchNews,
  patchNews,
  postNews
} from '../../hooks/fetchNews';

import classes from './AdminHandleNews.module.css';
import AuthContext from '../../Context/auth-context';
import IsLoadingContext from '../../Context/isLoading-context';
import PopupWindow from '../PopupWindow/PopupWindow';
import NewsLiElement from '../newsLiElement/NewsLiElement';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

/**
 * Component of type AdminHandleNews.
 * @returns {JSX} - JSX Element.
 */
function AdminHandleNews() {
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [newsFromFetch, setNewsFromFetch] = useState(null);
  const [newsToEditTitle, setNewsToEditTitle] = useState('');
  const [newsToEditContent, setNewsToEditContent] = useState('');
  const [newsToEditId, setNewsToEditId] = useState('');

  const authContext = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(IsLoadingContext);

  const handleCreateAction = (title, body) => {
    postNews(authContext.token, title, body);
  };

  const handleEditAction = (title, content, id) => {
    setNewsToEditTitle(title);
    setNewsToEditContent(content);
    setNewsToEditId(id);

    setShowEditPopup(true);
  };

  const handleEditSaveAction = async (title, content, id) => {
    await patchNews(authContext.token, id, title, content);
  };

  const handleDeleteAction = async (id) => {
    await deleteNews(authContext.token, id);
  };

  useEffect(() => {
    const gatherData = async () => {
      setIsLoading(true);
      const data = await fetchNews(authContext.token);
      setNewsFromFetch(data);
      setIsLoading(false);
    };
    gatherData();
  }, []);

  return (
    <div className={classes.container}>
      {showPopup && (
        <div className={classes.addNewWindow}>
          <PopupWindow
            saveAction={handleCreateAction}
            closeAction={() => setShowPopup(false)}
          />
        </div>
      )}

      {showEditPopup && (
        <div className={classes.addNewWindow}>
          <PopupWindow
            saveAction={handleEditSaveAction}
            closeAction={() => setShowEditPopup(false)}
            title={newsToEditTitle}
            content={newsToEditContent}
            id={newsToEditId}
          />
        </div>
      )}

      {!isLoading
        ? (
          <div className={classes.handleNewsContainer}>
            <div className={classes.newsContainerHeader}>
              <h3>Här listas alla nyheter, du kan ändra eller ta bort dem.</h3>
              <button
                type="button"
                className={classes.openPopupBtn}
                onClick={() => setShowPopup(true)}
              >
                Skriv en nyhet
              </button>
            </div>
            {newsFromFetch !== null && newsFromFetch.map((n) => (
              <div className={classes.newsContainerCard} key={n.id}>
                <NewsLiElement
                  sub={n.id}
                  title={n.title}
                  content={n.content}
                  showEdit="true"
                  handleEditAction={handleEditAction}
                  handleDeleteAction={handleDeleteAction}
                />
              </div>
            ))}
          </div>
        )
        : <LoadingSpinner loadingMessage="Laddar nyheter ..." />}
    </div>
  );
}

export default AdminHandleNews;
