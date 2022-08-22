import React, { Component } from 'react';
import { login } from '../store';
import { connect } from 'react-redux';
import SignInAdmin from '../SignInAdmin'
class SignIn extends Component{
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      showAdminSignIn: false

    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderAdminSignIn = this.renderAdminSignIn.bind(this)

  }
  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onSubmit(ev){
    ev.preventDefault();
    this.props.login(this.state);
  }

  renderAdminSignIn() {
    this.setState({showAdminSignIn: true});
  }

  render(){
    const { onChange, onSubmit, renderAdminSignIn } = this;
    const { username, password, showAdminSignIn } = this.state;
    return (
      <div>

      { showAdminSignIn ? <SignInAdmin onSubmit={onSubmit} /> :
      <form onSubmit={ onSubmit }>
        Sign-In: <br></br>
        Username: 
        <input name='username' onChange={ onChange } value={ username }/>
        Password:
        <input type='password' name='password' value={ password } onChange={ onChange }/>
        <button>Login</button>
        <button onClick={renderAdminSignIn}> Admin? Click here to sign in.</button>

      </form>
      }
      </div>
    );
  }
}

const mapDispatch = (dispatch)=> {
  return {
    login: (credentials)=> {
      dispatch(login(credentials));
    }
  };
};

export default connect(null, mapDispatch)(SignIn);
