import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Spinner from '../common/Spinner'
import { getPost } from '../../actions/postActions'
import PostItem from '../posts/PostItem'

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    const { post, loading } = this.props;
    let PostContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      PostContent = <Spinner />
    } else {
      PostContent = (
        <div>
          <PostItem post={post} showAction={false} />
        </div>
      )
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back to feed
              </Link>
              {PostContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { getPost })(Post)