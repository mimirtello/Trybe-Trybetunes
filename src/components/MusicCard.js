import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isFavorite: false,
      isLoading: true,
      favorito: [],
    };
  }

  componentDidMount() {
    const { favoritoMusica, id } = this.props;
    console.log(favoritoMusica)
    const musicaFavorite = favoritoMusica.some((musica) => musica.trackId === id);
    this.setState({ isFavorite: musicaFavorite, isLoading: false });
  }

  saveSong = async () => {
    const { id, album } = this.props;
    await addSong(album);
    this.setState({ isFavorite: true, isLoading: false }, () => {
      this.setState((prevState) => ({ favorito: [...prevState.favorito, id] }));
    });
  }

  handleChange=({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.ckecked : target.value;
    this.setState({ [name]: value }, () => {
      this.saveSong();
    });
  }

  render() {
    const { previewUrl, id } = this.props;
    const { isFavorite, isLoading } = this.state;
    return (
      <div>

        {isLoading && <Loading />}

        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>

        <label
          data-testid={ `checkbox-music-${id}` }
          htmlFor={ id }
        >
          Favorita
          <input
            type="checkbox"
            id={ id }
            checked={ isFavorite }
            onChange={ (event) => {
              this.setState({ isLoading: true }, () => this.handleChange(event));
            } }
          />
        </label>

      </div>
    );
  }
}
MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  favoritoMusica: PropTypes.arrayOf({}).isRequired,
  album: PropTypes.shape.isRequired,

  // trackId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,

};

export default MusicCard;
