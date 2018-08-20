import React from 'react'
import blogService from './services/blogs'

import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      message: '',
      username: '',
      password: '',
      user: null
    }
  }

  async componentDidMount() {
    const allBlogs = await blogService.getAll()
    this.setState({blogs: allBlogs})

    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUser) {
      const user = JSON.parse(loggedUser)
      this.setState({user: user})
      blogService.setToken(user.token)
    }
  }

  handleLoginFormSubmit = (user) => {
    if(user) {
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)

      this.setState({
        username: '',
        password: '',
        user: user
      })
    }
    else {
      this.setState({
        username: '',
        password: '',
        message: 'Incorrect username or password'
      })
      setTimeout(() => {
        this.setState({message: null})
      }, 5000)
    }

  }

  handleLoginChange = (data) => {
    this.setState({[data.name]: data.value})
  }

  handleLogoutChange = (data) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    this.setState({[data.name]: data.value})
    blogService.setToken(data.value)
  }

  render() {
    if(this.state.user === null) {
      return (
        <div>
          <LoginForm
            username={this.state.username}
            password={this.state.password}
            onLoginFieldChange={this.handleLoginChange}
            onSubmit={this.handleLoginFormSubmit}
          />
        </div>
      )
    } else {
      return (
        <div>
          <BlogForm
            blogs={this.state.blogs}
            user={this.state.user}
            onLogOutClick={this.handleLogoutChange}
          />
        </div>
      )
    }
  }
}

export default App;
