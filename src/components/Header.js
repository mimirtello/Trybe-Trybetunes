import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
    };
  }

  componentDidMount() {
    this.mostraNome();
  }

  mostraNome = async () => {
    this.setState(
      { user: await getUser() },
    );
  }

  render() {
    const { user } = this.state;
    return (

      <div data-testid="header-component">
        <p data-testid="header-user-name">{ user.name || <Loading />}</p>
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Músicas Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </div>
    );
  }
}

export default Header;
