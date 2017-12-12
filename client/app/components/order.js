import connect from 'redux-connect-decorator';
import { Component } from 'react';
import PropTypes from 'prop-types';

import { getFoods as getFoodsAction } from 'actions/foods';
import Comment from 'components/comment';

const mapStateToProps = ({ foods }) => ({
  foods
});

@connect(mapStateToProps, { getFoods: getFoodsAction })

class Order extends Component {
  static propTypes = {
    foods: PropTypes.array,
    getFoods: PropTypes.func
  };

  static defaultProps = {
    foods: [],
    getFoods: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      foodsToOrder: []
    };

    this.changeAmount = this.changeAmount.bind(this);
  }

  componentDidMount() {
    this.props.getFoods();
  }

  changeAmount(id, { target }) {
    console.log(id);
    const newState = [...this.state];

    newState[id] = target.value;
    this.setState(newState);
  }

  render = () => {
    return (
      <div className="order">
        { this.props.foods.map(({
          id, name, pictureUrl, price
        }) => (
          <div key={ id }>
            <div>{ name }</div>
            <img alt="food"
                 src={ pictureUrl }
                 height="100"
                 width="100" />
            <div>price: { price }</div>
            <input type="number"
                   value={ this.state[id] }
                   onChange={ () => this.changeAmount(id) } />
          </div>
        )) }
      </div>
    );
  }
}

export default Order;
