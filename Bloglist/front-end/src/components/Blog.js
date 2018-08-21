import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disp: ['', 'none'],
      value: 1
    }
  }

  toggle = () => {
    this.setState({value: 1 - this.state.value})
  }

  async onLike(blog) {
    try {
      blog.likes++
      await blogService
        .update(blog.id, blog)
      this.props.onLike()
    } catch(e) {
      console.log(e)
    }
  }

  render() {
    const blog = this.props.blog
    const user = {...blog.user}
    return (
      <div className="blog">
        <div onClick={this.toggle}>
          {blog.title} {blog.author}
        </div>
        <div className="blogextra" style={{display: this.state.disp[this.state.value]}}>
          {blog.url}<br />
        {blog.likes} likes<button onClick={() => this.onLike(blog)}>like</button><br />
          Added by {user.name}
        </div>
      </div>
    )
  }
}

export default Blog
