import React from 'react'
import Blog from './Blog'

class BlogForm extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h2>Blogs</h2>
          {this.props.blogs.map(blog =>
            <Blog className="blog" key={blog.id} blog={blog} />
          )}
        </div>
      </div>
    )
  }
}

export default BlogForm
