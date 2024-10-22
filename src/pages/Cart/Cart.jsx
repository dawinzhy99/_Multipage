import React from "react";
import "./Cart.css";


function Cart ({ cart, setCart }) {
  return (
    <>
      <div className="cart-container" data-theme="light">
        {cart.map((item) => (
          <div key={item.id}className="card bg-base-100 w-60 shadow-xl">
            <figure className="px-10 pt-10">
              <img src={item.thumbnailUrl} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center justify-content-between">
              <h2 className="card-title">{item.title}</h2>
              <div className="card-actions flex justify-content-center">
              <div className="flex justify-content-center">${item.price}</div>
                <button
                  className="btn btn-error"
                  onClick={() => setCart(cart.filter((c) => c.id !== item.id))}
                >Remove from Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-xl p-2 mt-5 border-1">
        
          Total Products : <span className="badge badge-lg badge-error border-1 border-black text-xl p-3 ">{cart.length} Item</span> - 
          Total :  {" "}
          
        <span className="badge badge-lg badge-success border-1 border-black text-xl p-3">
          ${cart.reduce((a, b) => a + b.price, 0).toFixed(2)}
          </span>
      </div>
    </>
  );
}

export default Cart;
