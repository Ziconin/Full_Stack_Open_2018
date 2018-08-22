import React from 'react'
import Blog from './Blog'

class BlogForm extends React.Component {

  onLikeButtonClicked = () => {
    this.props.onUpdate(this.props.blogs)
  }

  onDeleteButtonClicked = (id) => {
    const newBlogs = this.props.blogs.filter(blog => blog.id !== id)
    this.props.onUpdate(newBlogs)
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
              onDelete={this.onDeleteButtonClicked}
            />
          )}
        </div>
      </div>
    )
  }
}

export default BlogForm
