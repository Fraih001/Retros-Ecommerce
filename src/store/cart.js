import axios from 'axios';

const cart = (state = { lineItems: [ ] }, action)=> {
  if(action.type === 'SET_CART'){
    state = action.cart;
  } else if (action.type === 'DELETE_CART') {
    const lineItems = state.lineItems.filter(item => item.product.id !== action.id)
    state = {
      ...state,
      lineItems
    };
  } else if (action.type === 'UPDATE_QUANTITY') {
    const lineItem = state.lineItems.find(item => item.product.id === action.id);
    lineItem.quantity = action.quantity;
    state = {
      ...state
    };
  }
  return state;
};

export const addCart = (product, quantity) => {
  return async (dispatch) => {
    const response = await axios.put('/api/orders/cart', {
      product,
      quantity
    }, {
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    });
    if (response.status === 200) {
      alert('Added to cart successfully')
    }
  }
}

export const fetchCart = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/orders/cart', {
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    });
    dispatch({ type: 'SET_CART', cart: response.data});
  };
};

export const deleteCart = (product) => {
  return async(dispatch)=> {
    const response = await axios.put('/api/orders/cart', {
      product,
      quantity: 0
    }, {
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    });
    if (response.status === 200) {
      dispatch({type: 'DELETE_CART', id: product.id});
    }
  };
};

export const updateQuantity = (product, quantity) => {
  return async(dispatch)=> {
    const response = await axios.put('/api/orders/cart', {
      product,
      quantity
    }, {
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    });
    if (response.status === 200) {
      dispatch({ type: 'UPDATE_QUANTITY', id: product.id, quantity});
    }
  };
}


export default cart;
