import React, { Component } from 'react'
import './styles.css'

class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  submitForm = (e) => {
    e.preventDefault()
    this.props.onLogin({variables: {email: this.state.email, password: this.state.password} })
  }

  onChangeEmail = (e) => {
    this.setState({email: e.target.value})
  }

  onChangePassword = (e) => {
    this.setState({password: e.target.value})
  }

  render() {
    return (
        <form className="login__form" onSubmit={(e) => this.submitForm(e)}>
          <span className="login__email">email <input type="text" onChange={(e) => this.onChangeEmail(e)}/></span>
          <span className="login__password">password<input type="text" onChange={(e) => this.onChangePassword(e)}/></span>
          <button className="login__submit_button">Submit</button>
        </form>
    )
  }
}

export default LoginForm