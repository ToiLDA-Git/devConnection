import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePost } from '../../actions/postActions'

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  render() {
    const { post, auth } = this.props;
    return (
      <div className="posts">
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-md-2">
              <a href="profile.html">
                <img
                  className="rounded-circle d-none d-md-block"
                  src={auth.user.avatar}
                  alt="" />
              </a>
              <br />
              <p className="text-center">{auth.user.name}</p>
            </div>
            <div className="col-md-10">
              <p className="lead">{post.text}</p>
              <button type="button" className="btn btn-light mr-1">
                <i className="text-info fas fa-thumbs-up"></i>
                <span className="badge badge-light">4</span>
              </button>
              <button type="button" className="btn btn-light mr-1">
                <i className="text-secondary fas fa-thumbs-down"></i>
              </button>
              <Link to={`posts/${post._id}`} className="btn btn-info mr-1">Comments</Link>

              {post.user === auth.user.id ? (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.onDeleteClick.bind(this, post._id)}>
                  <i className="fas fa-times"></i>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deletePost })(PostItem);