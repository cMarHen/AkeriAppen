import React, { useState, useContext, useEffect } from 'react';
import Card from '../HighlightCard/HighlightCard';
import NewsLiElement from '../newsLiElement/NewsLiElement';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import classes from './News.module.css';
import { fetchNews } from '../../hooks/fetchNews';
import AuthContext from '../../Context/auth-context';
import IsLoadingContext from '../../Context/isLoading-context';

/**
 * Component of type News.
 *
 * @returns {JSX} - JSX Element.
 */
function News({ isAdmin }) {
  const authContext = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(IsLoadingContext);

  const [newsFromFetch, setNewsFromFetch] = useState(null);
  const [primaryNews, setPrimaryNews] = useState([]);
  const [secondaryNews, setSecondaryNews] = useState([]);

  useEffect(() => {
    const gatherData = async () => {
      setIsLoading(true);
      const data = await fetchNews(authContext.token);
      setNewsFromFetch(data);
      setIsLoading(false);
    };
    gatherData();
  }, []);

  // Distribute fetched data to different states.
  useEffect(() => {
    const prim = [];
    const sec = [];
    if (newsFromFetch !== null && newsFromFetch.length > 0) {
      newsFromFetch.map((obj, i) => (i < 4
        ? prim.push(obj)
        : sec.push(obj)));
      setIsLoading(false);
    }
    setPrimaryNews(prim);
    setSecondaryNews(sec);
  }, [newsFromFetch, setIsLoading]);

  return (
    !isLoading
      ? (
        <div className={classes.container}>
          <div className={classes.cardContainer}>
            {primaryNews !== null && primaryNews.map((n) => (
              <Card
                key={n.id}
                title={n.title}
                body={n.content}
                isAdmin={isAdmin}
              />
            ))}
          </div>
          <div className={classes.newsAside}>
            <div className={classes.newsHistory}>
              <h4>Gamla nyheter:</h4>
              <ul>
                {secondaryNews !== null && secondaryNews.map((n) => (
                  <NewsLiElement
                    sub={n.id}
                    key={n.id}
                    title={n.title}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
      : <LoadingSpinner loadingMessage="Laddar senaste nytt ..." />
  );
}

export default News;
