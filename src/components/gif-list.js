import React from 'react';
import GifItem from './gif-item';
import ErrorBoundray from './error-boundary';
import '../styles/gif-list.css'

const GifList = (props) => {
    const gifItems = props.gifs.map((image) => {
        return <GifItem key={image.id}
                        gif={image}
                        onGifSelect={props.onGifSelect}
                        onFavoriteSelect={props.onFavoriteSelect}
                        onFavoriteUnselect={props.onFavoriteUnselect}
                        isAuthenticated={props.isAuthenticated}
                        isFavorite={props.isFavorite} />
    });

    return (
      <ErrorBoundray>
        <div className="gif-list">{gifItems}</div>
      </ErrorBoundray>
    );
};

export default GifList;
