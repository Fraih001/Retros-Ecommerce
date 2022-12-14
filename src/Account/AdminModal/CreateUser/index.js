import React, { Component } from 'react';
import { createUser } from '../../../store';
import { connect } from 'react-redux';

class CreateUser extends Component{
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
      isAdmin: false,
    };
    this.onChangeAdmin = this.onChangeAdmin.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  };

  onChangeAdmin(ev){
    if(ev.target.checked) {
        this.setState({[ev.target.name]: true})
    } else {
        this.setState({[ev.target.name]: false})
    }
  }

  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  };

  onSubmit(ev){
    ev.preventDefault();
    this.props.createUser(this.state);
    }

  render(){
    const { onChange, onSubmit, onChangeAdmin } = this;
    const { username, password, email, isAdmin } = this.state;
    return (
        <form onSubmit={ onSubmit }>
          <div class='adminc'> Username:  </div>
            <input name='username' onChange={ onChange } value={ username }/>
            <div class='adminc'> Password:  </div>
            <input type='password' name='password' value={ password } onChange={ onChange }/>
            <div class='adminc'> Email:  </div>
            <input type='email' name='email' value={ email } onChange={ onChange }/>
            <div class='adminc'> Set Admin Privilege?  </div>
            <input type="checkbox" name="isAdmin" onChange = { onChangeAdmin } value={ isAdmin }  />
            <button class='adminbutton'>Create User</button>
           
        </form>
    );
  }
}

const mapDispatch = (dispatch)=> {
  return {
    createUser: (user)=> {
        dispatch(createUser(user));
      },
  };
};

export default connect(null, mapDispatch)(CreateUser);