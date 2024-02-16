import { Link } from "react-router-dom";
import { useCarts } from "../../cartProviders/CartProviders";
import { useUsers } from "../../userProvider/UserProviders";
import "./checkout.css";
const Checkout = () => {
  const user = useUsers();
  const { cart, total } = useCarts();
  if (!cart.length)
    return (
      <main className="container">
        <Link to="/">go to shopping?</Link>
      </main>
    );
  return (
    <main className="container">
      <section className="cartCenter">
        {user ? (
          <>
            {" "}
            <section className="cartItemList">
              <h3>checkout detail</h3>
              <p>name : {user.name}</p>
              <p>email : {user.email}</p>
              <p>tel : {user.phoneNumber}</p>
            </section>
            <section className="cartSummary">
              {cart &&
                cart.map((c) => {
                  return (
                    <div key={c.id}>
                      <div>
                        <img src={c.image} alt={c.name}></img>
                      </div>
                      {c.name}*{c.quantity}:{c.quantity}*{c.offPrice}$
                    </div>
                  );
                })}
              <hr />
              <div>total price:{total}$</div>
              <Link to={user ? "/checkInfo" : "/signup?redirect=checkInfo"}>
                <button
                  className="btn primary"
                  style={{ marginTop: "20px", width: "100%" }}
                >
                 select payment method
                </button>
              </Link>
            </section>
          </>
        ) : (
          <p>please log in....</p>
        )}
      </section>
    </main>
  );
  // return ( <div>{user ?<div>
  //   <p>name : {user.name}</p>
  //   <p>email : {user.email}</p>
  //   <p>tel : {user.phoneNumber}</p>
  // </div>:<p>please login</p>}</div>
  //  );
};

export default Checkout;
