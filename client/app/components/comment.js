import connect from 'redux-connect-decorator';
import { Component } from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';

import { addComment as addCommentAction } from 'actions/foods';

const mapStateToProps = ({ foods }) => ({
  foods
});

@connect(mapStateToProps, { addComment: addCommentAction })

class Comment extends Component {
  static propTypes = {
    foods: PropTypes.array,
    id: PropTypes.number,
    addComment: PropTypes.func
  };

  static defaultProps = {
    foods: [],
    id: null,
    addComment: () => {}
  };

  render = () => {
    return (
      <div className="comments">
        { find(this.props.foods, { id: this.props.id }).comments.map(({
          createdAt, title, description, customerName
        }) => (
          <div>
            <div>{ title }</div>
            <div>from: { customerName }</div>
            <div>date: { createdAt }</div>
            <div>{ description }</div>
          </div>
        )) }
        <button onClick={ () => { this.props.addComment(); } }>
          Add new comment
        </button>
      </div>
    );
  }
}

export default Comment;
