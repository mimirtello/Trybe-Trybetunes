import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nameUser: '',
      isDisabled: true,
      isLoading: false,
    };
  }

  inputChange=(event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      this.validation();
    });
  }

  createUserName = async () => {
    const { history } = this.props;
    const { nameUser } = this.state;

    this.setState({ isLoading: true });
    await createUser({ name: nameUser });
    history.push('/search');
  }

    validation = async () => {
      const { nameUser } = this.state;
      const tres = 3;
      if (nameUser.length >= tres) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    }

    render() {
      const { isDisabled, isLoading, nameUser } = this.state;
      return (
        <div data-testid="page-login">
          {isLoading && <Loading /> }
          <input
            type="text"
            name="nameUser"
            data-testid="login-name-input"
            onChange={ this.inputChange }
            value={ nameUser }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isDisabled }
            onClick={ this.createUserName }
          >
            Entrar

          </button>
        </div>
      );
    }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
