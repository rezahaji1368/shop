import Layout from "../Layout/Layout";
import * as data from "../Data";
import "./HomePage.css";
import { useCarts, useCartsAction } from "../cartProviders/CartProviders";
import checkInCart from "../utils/checkInCart";
import { toast  } from "react-toastify";
const HomePageComponent = () => {
  const {cart}=useCarts();
  const dispatch=useCartsAction();
  const addProductHandler=(product)=>{
    toast.success(`${product.name} Added To Cart`)
    dispatch({type:"add",product:product})
  }
  return (
    <Layout>
      <div className="sidebar">
        <ul className="menu">
          <li className="item">
            دسته بندی
            <ul className="submenu">
              <li>کیف</li>
              <li>کفش</li>
              <li>کلاه</li>
              <li>دستکش</li>
              <li>چتر</li>
            </ul>
          </li>
          <li className="item">
            براساس رنگ
            <ul className="submenu">
              <li>قرمز</li>
              <li>سیاه</li>
              <li>آبی</li>
              <li>سفید</li>
            </ul>
          </li>
        </ul>
      </div>
      <main className="container">
        <section className="productList">
          {data.products.map((product) => (
            <section className="product" key={product.id}>
              <div className="productImg">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="productDesc">
                <p>{product.name}</p>
                <p>${product.price}</p>
                <button
                  onClick={() => addProductHandler(product)}
                  className="btn1 primary1"
                >
                  {checkInCart(cart, product) ? "In Cart" : "Add To Cart"}
                </button>
              </div>
            </section>
          ))}
        </section>
      </main>
    </Layout>
  );
};

export default HomePageComponent;
