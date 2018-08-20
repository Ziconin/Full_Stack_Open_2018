import React from 'react'
import Blog from './Blog'

class BlogForm extends React.Component {
  logout = () => {
    this.props.onLogOutClick({
      name: 'user',
      value: null
    })
  }

  render() {
    return (
      <div>
        <div>
          Logged in as {this.props.user.name}
          <button onClick={this.logout}>Log out</button>
        </div>
        <div>
          <h2>Blogs</h2>
          {this.props.blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </div>
    )
  }
}

export default BlogForm
