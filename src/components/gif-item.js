import React from 'react';
import '../styles/gif-item.css'

class GifItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: this.props.isFavorite
    };
  }

  favoriteGif() {
    this.setState({ favorited: true });
    this.props.onFavoriteSelect(this.props.gif);
  }

  unfavoriteGif() {
    this.setState({ favorited: false });
    this.props.onFavoriteUnselect(this.props.gif);
  }

  renderFavoriteHeart = () => {
    if (! this.props.isAuthenticated) {
      return '';
    }
    if (this.state.favorited) {
      return <i className='favorite fa fa-heart' onClick={() => this.unfavoriteGif()} />;
    }
    return <i className='favorite fa fa-heart-o' onClick={() => this.favoriteGif()} />;
  };

  render(){
    if (this.props.gif.images) {
      return (
        <div className='gif-item'>
          { this.renderFavoriteHeart() }
          <img className='gif-image' src={this.props.gif.images.downsized.url} alt='loading' onClick={() => this.props.onGifSelect(this.props.gif)} />
        </div>
      );
    } else {
      return (
        <div className='loader'>Loading</div>
      );
    }
  }
};

export default GifItem;
