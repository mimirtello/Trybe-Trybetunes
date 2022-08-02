import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nameArtist: '',
      isDisabled: true,
    };
  }

  inputChange=(event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      this.validation();
    });
  }

  validation = async () => {
    const { nameArtist } = this.state;
    const dois = 2;
    if (nameArtist.length >= dois) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { isDisabled, nameArtist } = this.state;
    return (

      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          name="nameArtist"
          data-testid="search-artist-input"
          onChange={ this.inputChange }
          value={ nameArtist }
        />

        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ isDisabled }
        >
          Pesquisar

        </button>
      </div>
    );
  }
}

export default Search;
