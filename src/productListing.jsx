import { data, lowToHigh, highToLow } from "./productsData";
import { ProductCard } from "./productCard";
import { useReducer } from "react";
import { useEffect, useState } from "react";
import { Filters } from "./filtersField";
import searchHandler from "./Logic/searchHandler";
import reducer from "./Logic/reducer";
import priceFiltering from "./Logic/pricefiltering";
import showinventory from "./Logic/showinventory";
import sortingFunction from "./Logic/sortingfunction";
import { useSearch } from "./SearchContext";
import { useData } from "./Context/DataContext";
export function ProductListing() {
  const [{ sortingAction, showInventory, priceRange }, dispatch] = useReducer(
    reducer,
    {
      sortingAction: null,
      showInventory: true,
      priceRange: 1000,
    }
  );
  const [sidebar, setSidebar] = useState(false);
  const { productData } = useData();
  const { search, keydown } = useSearch();

  useEffect(() => {
    const ele = document.querySelector(".buble");
    if (ele) {
      ele.style.left = `${Number(priceRange / 5)}px`;
    }
  });

  const sortedData = sortingFunction(productData, sortingAction);
  const showinventoryData = showinventory(sortedData, showInventory);

  const priceRangeData = priceFiltering(showinventoryData, priceRange);
  const searchData = searchHandler(keydown, priceRangeData, search);
  // console.log(searchData);

  return (
    <section className="product-listing">
      <Filters
        sidebar={sidebar}
        lowToHigh={lowToHigh}
        highToLow={highToLow}
        sortingAction={sortingAction}
        showInventory={showInventory}
        priceRange={priceRange}
        dispatch={dispatch}
      />
      <div className="products-section">
        {productData.length === 0 && <>Loading......</>}
        {productData && search === "" ? (
          priceRangeData.map((item) => {
            return <ProductCard key={item.id} item={item} />;
          })
        ) : searchData.length !== 0 ? (
          searchData.map((item) => {
            return <ProductCard key={item.id} item={item} />;
          })
        ) : (
          <h2>No matching item found</h2>
        )}
      </div>
      <button
        className="floating-action"
        onClick={() => setSidebar((prev) => !prev)}
      >
        <i className="fa fa-filter"></i>
      </button>
    </section>
  );
}
// <ProductCard key={item.id} {...item} />