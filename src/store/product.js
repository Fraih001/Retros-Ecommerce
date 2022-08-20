import axios from 'axios';


const product = (state = [], action)=> {
  if(action.type === 'SET_PRODUCTS'){
    state = action.products;
  }
  return state;
};

export const fetchProducts = ()=> {
  return async(dispatch)=> {
    const response = (await axios.get('/api/products')).data;
    dispatch({ type: 'SET_PRODUCTS', products: response });
  };
};


export default product;
