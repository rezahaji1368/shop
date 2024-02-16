import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useCarts, useCartsAction } from "../cartProviders/CartProviders";
import "./CartPage.css";
import { BsFillBasketFill } from "react-icons/bs";
import { useUsers } from "../userProvider/UserProviders";

const CartPage = () => {
  const { cart, total } = useCarts();
  const dispatch = useCartsAction();
  const addItemHandler = (cartItem) => {
    dispatch({ type: "add", product: cartItem });
  };
  const removeItemHandler = (cartItem) => {
    dispatch({ type: "remove", product: cartItem });
  };
  if (!cart.length)
    return (
      <Layout>
        <main className="container">
          <section className="cartCenter">
            <section className="cartItemList" style={{ alignItems: "center" }}>
              <div style={{paddingTop:"7%"}}>
                <BsFillBasketFill size={70} />
              </div>
            </section>
            <CartSummary cart={cart} total={total} />
          </section>
        </main>
      </Layout>
    );
  return (
    <Layout>
      <main className="container">
        <section className="cartCenter">
          <section className="cartItemList">
            {cart.map((item) => {
              return (
                <div key={item.id} className="cartItem">
                  <div className="itemImg">
                    <img src={item.image} alt={item.name}></img>
                  </div>
                  <div>{item.name}</div>
                  <div>${item.price * item.quantity}</div>
                  <div className="btnGroup">
                    <button
                      // className="btn primary"
                      onClick={() => addItemHandler(item)}
                    >
                      Add
                    </button>
                    <button
                    // className="btn"
                    >
                      {item.quantity}
                    </button>
                    <button
                      // className="btn primary"
                      onClick={() => {
                        removeItemHandler(item);
                      }}
                    >
                      remove
                    </button>
                  </div>
                </div>
              );
            })}
          </section>
          <CartSummary cart={cart} total={total} />
        </section>
      </main>
    </Layout>
  );
};

export default CartPage;
const CartSummary = ({ cart, total }) => {
  const user=useUsers();
  const originalTotal = cart.length
    ? cart.reduce((acc, curry) => acc + curry.quantity * curry.price, 0)
    : 0;
  return (
    <section className="cartSummary ">
      <h2>cart summary</h2>
      <div className="summaryItem">
        <p> original Total </p>
        <p>{originalTotal}</p>
      </div>
      <div className="summaryItem">
        <p> cart discount </p>
        <p>{originalTotal - total}</p>
      </div>
      <hr />
      <div className="summaryItem net">
        <p> net price </p>
        <p>{total}</p>
      </div>
      <Link to={user ? "/checkout": "/signup?redirect=checkout"}>
      <button className="btn primary" style={{marginTop:"20px",width:"100%"}}>GO TO CHECKOUT</button>
      </Link>
    </section>
  );
};
