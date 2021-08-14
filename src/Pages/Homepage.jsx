export function HomePage() {
  return (
    <section className="homepage">
      <div className="homepage-banner">
        <img
          className="header-img"
          src="https://bit.ly/2rlzaXi"
          alt="Five developers at work."
        />
        <div className="header-overlay">
          <h1>Ellen Macpherson</h1>
          <h2>Just another tech blog.</h2>
        </div>
      </div>
      <div className="homepage-center">
      <div className="header-brands">
          <div className="brands-list">
              <p className="nike">Nike</p>
              <p className="puma">Puma</p>
              <p className="addidas">Addidas</p>
              <p className="fila">Fila</p>
          </div>
      </div>
      <div className="homepage-products">
          <div className="homepage-product">
              <img className="homepage-products-1"src="https://bit.ly/2rlzaXi"/>
          </div>
          <div className="homepage-product">
              <img className="homepage-products-1"src="https://bit.ly/2rlzaXi"/>
          </div>
          <div className="homepage-product">
              <img className="homepage-products-1"src="https://bit.ly/2rlzaXi"/>
          </div>

      </div>
      </div>
    </section>
  );
}
