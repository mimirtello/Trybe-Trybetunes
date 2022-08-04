import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  // pegaOId = favoritas.find(({ fav }) => fav === id);

  constructor() {
    super();
    this.state = {
      album: [],
      isLoading: false,
      fav: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({ isLoading: false }, async () => {
      const response = await getMusics(id);
      const favoritas = await getFavoriteSongs();
      this.setState({ album: response, isLoading: true, fav: favoritas });
    });
  }

  render() {
    const { album, isLoading, fav } = this.state;
    return (

      <div data-testid="page-album">
        <Header />
        {!isLoading && <Loading />}
        <p data-testid="artist-name">{isLoading && album[0].artistName}</p>
        <p data-testid="album-name">{isLoading && album[0].collectionName}</p>
        {isLoading && album.map((elemento, index) => (
          <div key={ index }>
            <p>{elemento.trackName }</p>
            {elemento.kind === 'song' && (
              <MusicCard
                previewUrl={ elemento.previewUrl }
                id={ elemento.trackId }
                favoritoMusica={ fav }
                album={ elemento }
              />)}
          </div>
        ))}

      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default Album;
