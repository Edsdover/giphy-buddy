import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchBar from '../components/search-bar'
import GifList from '../components/gif-list'
import GifDetailModal from '../components/gif-detail-modal'
import * as actions from '../actions'
import '../styles/landing-page.css'

class LandingPage extends React.Component {
  componentWillMount() {
    this.props.actions.getTrendingGifs(10, 0);
  }

  // Detects when user has hit the bottom of the document
  // TODO: Add offset logic action to return infinite gifs

  // componentDidMount() {
  //   window.onscroll = function() {
  //     var d = document.documentElement;
  //     var offset = d.scrollTop + window.innerHeight;
  //     var height = d.offsetHeight;
  //
  //     if (offset === height) {
  //       console.log('At the bottom');
  //       var limit = 20;
  //       var offset = 0;
  //       this.props.actions.getOffsetGifsBySearchOptions(limit, offset, this.state.searchOptions);
  //     }
  //   }
  // }

  render() {
    return (
      <div>
        <SearchBar onSearchChange={ this.props.actions.getGifsBySearchOptions } />
        <GifList gifs={ this.props.gifs }
                 onGifSelect={ selectedGif => this.props.actions.openModal({selectedGif}) }
                 onFavoriteSelect={ selectedGif => this.props.actions.favoriteGif({selectedGif}) }
                 onFavoriteUnselect={ selectedGif => this.props.actions.unfavoriteGif({selectedGif}) }
                 isAuthenticated={ this.props.authenticated } />
        <GifDetailModal modalIsOpen={ this.props.modalIsOpen }
                        selectedGif={ this.props.selectedGif }
                        onRequestClose={ () => this.props.actions.closeModal() } />
      </div>
    );
  }
}

//recives data from store and maps to state in this case form App.js
//only needed when passing action functions down as props from a container to a component
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    gifs: state.gifs.data,
    modalIsOpen: state.modal.modalIsOpen,
    selectedGif: state.modal.selectedGif
  };
}

//sends data from container to store to request update/change
//only needed when passing action functions down as props from a container to a component
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

//export the results from the connect function
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
