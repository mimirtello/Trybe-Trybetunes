import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      // id: '',
      // album: [],
    };
  }

  render() {
    const { previewUrl } = this.props;
    return (
      <div>
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
      </div>
    );
  }
}
MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,

};

export default MusicCard;
