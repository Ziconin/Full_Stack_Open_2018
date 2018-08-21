import React from 'react'
import Blog from './Blog'

class BlogForm extends React.Component {

  onLikeButtonClicked = () => {
    this.props.onUpdate(this.props.blogs)
  }

  render() {
    return (
      <div>
        <div>
          <h2>Blogs</h2>
          {this.props.blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              onLike={this.onLikeButtonClicked}
            />
          )}
        </div>
      </div>
    )
  }
}

export default BlogForm
