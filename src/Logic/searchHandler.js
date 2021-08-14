const searchHandler = (keydown, showinventoryData, value) => {
  if (value !== "" && keydown.toLowerCase() === "enter") {
    return showinventoryData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
  }
  return showinventoryData;
};

export default searchHandler;
