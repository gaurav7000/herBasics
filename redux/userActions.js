export const addItem = (itemData) => {
  return {
    type: 'ADD_ITEM',
    payload: itemData
  };
};

export const removeItem = (itemData) => {
  return {
    type: 'REMOVE_ITEM',
    payload: itemData
  };
};