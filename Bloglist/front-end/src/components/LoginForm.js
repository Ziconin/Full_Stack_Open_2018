import React from 'react'
import loginService from '../services/login'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onLoginFieldChange = this.onLoginFieldChange.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.props.username,
        password: this.props.password
      })
      this.props.onSubmit(user)
    } catch(e) {
      this.props.onSubmit(null)
    }
  }

  onLoginFieldChange = (event) => {
    this.props.onLoginFieldChange(event.target)
  }

  render () {
    return (
      <div>
        <h2>Log in:</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            Username:
            <input
              type="text"
              name="username"
              value={this.props.username}
              onChange={this.onLoginFieldChange}
            />
          </div>
          <div>
            Password:
            <input
              type="password"
              name="password"
              value={this.props.password}
              onChange={this.onLoginFieldChange}
            />
          </div>
          <div>
            <button type='submit'>Log in</button>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
