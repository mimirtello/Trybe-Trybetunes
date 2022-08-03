import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({ album: response, isLoading: true });
  }

  render() {
    const { album, isLoading } = this.state;
    return (

      <div data-testid="page-album">
        <Header />

        <p data-testid="artist-name">{isLoading && album[0].artistName}</p>
        <p data-testid="album-name">{isLoading && album[0].collectionName}</p>
        {isLoading && album.map((elemento, index) => (
          <div key={ index }>
            <p>{elemento.trackName }</p>
            {elemento.kind === 'song' && (
              <MusicCard
                previewUrl={ elemento.previewUrl }
                id={ elemento.trackId }
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
