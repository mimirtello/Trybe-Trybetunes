import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      user: '',
    };
  }

  componentDidMount() {
    this.mostraNome();
  }

  mostraNome = () => {
    this.setState({ isLoading: true },
      async () => {
        this.setState({ user: await getUser() }, () => {
          this.setState({ isLoading: false });
        });
      });
  }

  render() {
    const { user, isLoading } = this.state;
    return (

      <div data-testid="header-component" className="links">
        {isLoading && <Loading />}
        <p data-testid="header-user-name" className="user">{ user.name }</p>
        <Link
          to="/search"
          data-testid="link-to-search"
          className="link-pesquisa"
        >
          Pesquisa

        </Link>
        <Link
          to="/favorites"
          data-testid="link-to-favorites"
          className="link-musicas"
        >
          Músicas Favoritas

        </Link>
        <Link
          to="/profile"
          data-testid="link-to-profile"
          className="link-perfil"
        >
          Perfil

        </Link>

      </div>
    );
  }
}

export default Header;
