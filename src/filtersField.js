export const Filters = ({
  sidebar,
  lowToHigh,
  highToLow,
  sortingAction,
  showInventory,
  priceRange,
  dispatch,
}) => {
  return (
    <>
      <section className={`side-nav-filter ${sidebar ? `close` : ``}`}>
        <div className="side-nav-price-filter">
          <h4>Price</h4>
          <li>
            <label htmlFor={lowToHigh}>
              <input
                type="radio"
                name="sort"
                checked={sortingAction && sortingAction === lowToHigh}
                onChange={() => dispatch({ type: "SORT", payload: lowToHigh })}
              ></input>
              Low to High
            </label>
          </li>
          <li>
            <label htmlFor={highToLow}>
              <input
                type="radio"
                name="sort"
                checked={sortingAction && sortingAction === highToLow}
                onChange={() => dispatch({ type: "SORT", payload: highToLow })}
              ></input>
              High to Low
            </label>
          </li>
        </div>
        <div className="side-nav-generic-filter">
          <h4>Product Status</h4>
          <li>
            <label htmlFor="showInventory">
              <input
                type="checkbox"
                name="inStock"
                checked={!showInventory}
                onChange={() => dispatch({ type: "SHOW_INVENTORY" })}
              ></input>
              In-Stock
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" name="inStock"></input>
              Fast Delivery
            </label>
          </li>
        </div>
        <div className="side-nav-slider-filter">
          <h4>Range Slider</h4>
          <label htmlFor="priceRange">
            <div className="pure-material-slider slider-parent">
              <input
                type="range"
                min={20}
                step={1}
                max={1000}
                value={priceRange}
                onChange={(e) =>
                  dispatch({ type: "PRICE_RANGE", payload: e.target.value })
                }
              ></input>
              <div className="buble">{priceRange}</div>
            </div>
          </label>
        </div>
      </section>
    </>
  );
};
