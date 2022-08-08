import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      albumFavoritas: [],
      fav: [],
    };
  }

  componentDidMount() {
    this.removeFavoritos();
  }

  removeFavoritos=() => {
    this.setState({ isLoading: false }, async () => {
      const favoritas = await getFavoriteSongs();
      this.setState({ albumFavoritas: favoritas,
        isLoading: true,
        fav: favoritas,
      });
    });
  }

  render() {
    const { albumFavoritas, isLoading, fav } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {!isLoading && <Loading />}
        {isLoading && albumFavoritas.map((elemento, index) => (
          <div key={ index }>
            <p>{elemento.trackName }</p>
            {elemento.kind === 'song' && (
              <MusicCard
                previewUrl={ elemento.previewUrl }
                id={ elemento.trackId }
                favoritoMusica={ fav }
                album={ elemento }
                removeFavoritos={ this.removeFavoritos }
              />)}
          </div>
        ))}
      </div>
    );
  }
}

Favorites.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,

};
export default Favorites;
