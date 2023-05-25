const initialState = {
  items: [],
  totalPrice: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
        totalPrice: state.totalPrice + action.payload.price,
      };
    case 'REMOVE_ITEM':
      const newItems = state.items.filter(item => item.itemId !== action.payload.itemId);
      const newTotalPrice = state.totalPrice - action.payload.price;
      return {
        ...state,
        items: newItems,
        totalPrice: newTotalPrice,
      };
    default:
      return state;
  }
};

export default userReducer;
