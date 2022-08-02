import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nameArtist: '',
      isDisabled: true,
      // isLoading: false,
      artist: [],
      pesquisaDeArtista: '',
    };
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

 limpaInput = () => {
   this.setState({ nameArtist: '' });
 }

 pesquisa = async () => {
   const { nameArtist } = this.state;
   const response = await searchAlbumsAPI(nameArtist);
   this.setState({ artist: response });
   this.setState({ pesquisaDeArtista: nameArtist });
   this.limpaInput();
 }

 inputChange=(event) => {
   const { name, value } = event.target;
   this.setState({ [name]: value }, () => {
     this.validation();
   });
 }

 render() {
   const { isDisabled, nameArtist, artist, pesquisaDeArtista } = this.state;

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
         onClick={ this.pesquisa }
       >
         Pesquisar

       </button>
       <div>
         {artist.length === 0 && <p>Nenhum álbum foi encontrado</p>}
         <p>{`Resultado de álbuns de: ${pesquisaDeArtista}`}</p>
         {artist.map((elemento) => (
           <Link
             to={ `/album/${elemento.collectionId}` }
             key={ elemento.collectionId }
             data-testid={ `link-to-album-${elemento.collectionId}` }
           >
             <p>{ elemento.artistName }</p>
             <p>{ elemento.collectionName }</p>
             <p>{ elemento.collectionPrice }</p>
             <img src={ elemento.artworkUrl100 } alt="imagem" />
             <p>{elemento.releaseDate}</p>

           </Link>
         ))}
       </div>
     </div>
   );
 }
}

export default Search;
