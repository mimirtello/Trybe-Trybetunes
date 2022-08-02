import React from 'react';
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
      </div>
    );
  }
}

export default Header;
