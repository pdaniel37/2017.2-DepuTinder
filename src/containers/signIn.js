import React, { Component } from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { userLoginRequest } from '../actions/userLoginRequest';
import { removeAccount } from '../actions/removeAccountAction';

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = { email: '', password: '', flag: false };
  }

  handleEmailChange(email) {
    this.setState({ email });
    this.setState({ flag: false });
  }

  handlePasswordChange(password) {
    this.setState({ password });
    this.setState({ flag: false });
  }

  render() {
    const USER_LOGIN_SUCCESSFUL = 200;
    const USER_LOGIN_ERROR = 400;
    const USER_LOGIN_DONT_EXIST = 500;

    if (this.props.actualUser.status === USER_LOGIN_SUCCESSFUL && this.state.flag) {
      browserHistory.push('/');
      swal(this.props.actualUser.message,
        {
          icon: 'success',
        });
    } else if (this.props.actualUser.status === USER_LOGIN_ERROR && this.state.flag) {
      swal(this.props.actualUser.message,
        {
          icon: 'error',
        });
    } else if (this.props.actualUser.status === USER_LOGIN_DONT_EXIST && this.state.flag) {
      swal(this.props.actualUser.message,
        {
          icon: 'error',
        });
    }

    return (
      <div className="logInPage">
        <div
          id="titleLogIn"
        >
          <br />
          Login
        </div>
        <br />
        <div className="row">
          <div className="col s6 m6 l6">
            <div className="card" id="cardLogIn">
              <div className="card-content white accent-3">
                <form>
                  <div className="container">
                    <div className="row">
                      <div className="input-field col s12" id="inputEmail">
                        <input
                          id="userEmail" type="email" data-length="50"
                          onChange={event => this.handleEmailChange(event.target.value)}
                        />
                        <label htmlFor="userEmail">E-mail</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12" id="inputPassword">
                        <input
                          id="userPassword" type="password" data-length="50"
                          onChange={event => this.handlePasswordChange(event.target.value)}
                        />
                        <label htmlFor="userPassword">Senha</label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row" id="adminQuestionButtonsRow">
          <div className="input-field col s12" id="backButtonCollumn">
            <center>
              <a
                className="waves-effect waves-light btn black text-accent-3"
                id="loginButton"
                onClick={() => {
                  this.props.userLoginRequest(this.state.email, this.state.password);
                  this.setState({ flag: true });
                }}
              >Login
              </a>
            </center>
          </div>
        </div>
      </div>

    );
  }
}

SignIn.propTypes = {
  actualUser: PropTypes.obj,
  userLoginRequest: PropTypes.func.isRequired,
};

SignIn.defaultProps = {
  actualUser: {},
  userLoginRequest() {},
};

function mapStateToProps(state) {
  return {
    actualUser: state.actualUser,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLoginRequest(email, password) {
      dispatch(userLoginRequest(email, password));
    },
    removeAccount(email) {
      dispatch(removeAccount(email));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
