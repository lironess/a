import connect from 'redux-connect-decorator';
import { Component } from 'react';
import PropTypes from 'prop-types';

import { getFoods as getFoodsAction } from 'actions/foods';
import Comment from 'components/comment';

const mapStateToProps = ({ foods }) => ({
  foods
});

@connect(mapStateToProps, { getFoods: getFoodsAction })

class Menu extends Component {
  static propTypes = {
    foods: PropTypes.array,
    getFoods: PropTypes.func
  };

  static defaultProps = {
    foods: [],
    getFoods: () => {}
  };

  componentDidMount() {
    this.props.getFoods();
  }

  render = () => {
    return (
      <div className="menu">
        { this.props.foods.map(({
          id, name, pictureUrl, description, price, comments
        }) => (
          <div key={ id }>
            <div>{ name }</div>
            <img alt="food"
                 src={ pictureUrl }
                 height="100"
                 width="100" />
            <div>{ description }</div>
            <div>price: { price }</div>
            <div>Comments:</div>
            <Comments>
              {comments.map(comment=> <Comment comment={comment} />)}
            </Comments>
          </div>
        )) }
      </div>
    );
  }
}

export default Menu;
