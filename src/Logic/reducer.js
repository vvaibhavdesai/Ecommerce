function reducer(state, action) {
  switch (action.type) {
    case "SORT":
      return { ...state, sortingAction: action.payload };
    case "SHOW_INVENTORY":
      return { ...state, showInventory: !state.showInventory };
    case "PRICE_RANGE":
      return { ...state, priceRange: action.payload };
    case "FAST_DELIVERY":
      return { ...state, fastDelivery: !state.fastDelivery}
    default:
      return state;
  }
}

export default reducer;
