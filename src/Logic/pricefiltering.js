function priceFiltering(data, priceRange) {
  return data.filter((item) => item.price < priceRange);
}
export default priceFiltering;
