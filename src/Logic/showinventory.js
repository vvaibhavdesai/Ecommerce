function showinventory(data, showInventory) {
  return data.filter(({ inStock }) => (showInventory ? true : inStock));
}

export default showinventory;
