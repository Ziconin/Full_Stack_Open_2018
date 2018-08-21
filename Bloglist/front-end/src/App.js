import React from 'react'
import blogService from './services/blogs'

import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import AddForm from './components/AddForm'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      message: '',
      error: false,
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

      this.setState({user: user})
    }
    else {
      this.setState({
        error: true,
        message: 'Incorrect username or password'
      })
      setTimeout(() => {
        this.setState({
          message: null,
          error: false
        })
      }, 5000)
    }
  }

  handleNewBlogSubmit = (flag, obj) => {
    if(flag) {
      this.setState({
        message: `A new blog '${obj.title}' by ${obj.author} added`,
        blogs: this.state.blogs.concat(obj)
      })
    }
    else {
      this.setState({
        message: 'Blog failed to be added',
        error: true
      })
    }
    setTimeout(() => {
      this.setState({
        message: null,
        error: false
      })
    }, 5000)
  }

  handleLogoutChange = (event) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    this.setState({user: null})
    blogService.setToken(null)
  }

  render() {
    if(this.state.user === null) {
      return (
        <div>
          <Notification
            message={this.state.message}
            flag={this.state.error}
          />
          <LoginForm
            onLoginFieldChange={this.handleLoginChange}
            onSubmit={this.handleLoginFormSubmit}
          />
        </div>
      )
    } else {
      return (
        <div>
          <Notification
            message={this.state.message}
            flag={this.state.error}
          />
          <div>
            Logged in as {this.state.user.name}
            <button onClick={this.handleLogoutChange}>Log out</button>
          </div>
          <div>
            <AddForm
              onSubmit={this.handleNewBlogSubmit}
            />
          </div>
          <div>
            <BlogForm
              blogs={this.state.blogs}
            />
          </div>
        </div>
      )
    }
  }
}

export default App;
