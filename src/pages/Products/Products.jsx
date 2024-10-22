import React from "react";
import "./Products.css";

function Products({ products, cart, setCart }) {
  return (
    <div className="product-container" data-theme="light">
      {products.map((products) => (
        <div className="card bg-base-100 w-60 shadow-xl " key={products.id}>
          <figure className="px-4 pt-10 ">
            <img
              src={products.thumbnailUrl}
              alt="Shoes"
              className="rounded-xl "
            />
          </figure>
          <div className="card-body items-center flex justify-content-between">
            <h2 className="card-title">{products.title}</h2>

            <div className="">
              <div className="flex justify-content-center mb-1">
                ${products.price}
              </div>
              <div className="card-actions flex">
                {cart.find((cart) => cart.id === products.id) ? (
                  <button className="btn btn-error" disabled>
                    {" "}
                    In Cart
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setCart([...cart, products]);
                    }}
                  >
                    Buy Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
