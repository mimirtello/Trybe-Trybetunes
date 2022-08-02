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

      <div data-testid="header-component">
        {isLoading && <Loading />}
        <p data-testid="header-user-name">{ user.name }</p>
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Músicas Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>

      </div>
    );
  }
}

export default Header;
