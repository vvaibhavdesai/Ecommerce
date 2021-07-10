import { highToLow, lowToHigh } from "../productsData";

function sortingFunction(data, sortingAction) {
  if (sortingAction && sortingAction === lowToHigh) {
    return data.sort((a, b) => a["price"] - b["price"]);
  }
  if (sortingAction && sortingAction === highToLow) {
    return data.sort((a, b) => b["price"] - a["price"]);
  } else {
    return data;
  }
}
export default sortingFunction;
