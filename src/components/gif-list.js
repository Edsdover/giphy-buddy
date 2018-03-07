import React from 'react';
import GifItem from './gif-item';
import ErrorBoundary from './error-boundary';
import '../styles/gif-list.css'

const GifList = (props) => {
    const gifItems = props.gifs.map((image) => {
        return <GifItem
                      key={image.id}
                      gif={image}
                      onGifSelect={props.onGifSelect}
                      onFavoriteSelect={props.onFavoriteSelect}
                      onFavoriteUnselect={props.onFavoriteUnselect}
                      isAuthenticated={props.isAuthenticated}
                      isFavorite={props.isFavorite}
                    />
    });

    return (
      <ErrorBoundary>
        <div className="gif-list">{gifItems}</div>
      </ErrorBoundary>
    );
};

export default GifList;
