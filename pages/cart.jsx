import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import CashOnDeliveryModal from "../components/CashOnDeliveryModal";
import Image from "next/image";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Paypal from "../components/paypal";
import axios from "axios";
import { clearCart } from "redux/cart";
import styles from "styles/Cart.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Cart() {
  const { cart, total } = useSelector((state) => state.cart);
  const router = useRouter();
  const dispatch = useDispatch();

  const [showCashOnDelivery, setShowCashOnDelivery] = useState(false);
  const [paymentVisibilty, setPaymentVisibilty] = useState(false);
  const discount = 0;
  const createOrder = async (data) => {
    try {
      let res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        data
      );
      res.status === 201 && router.push(`/orders/${res.data._id}`);
      dispatch(clearCart());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <Table responsive="md" striped bordered className={styles.cartTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Name</th>
                <th>Extras</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((cartItem, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td style={{ height: "8rem" }}>
                      <div className={styles.imgContainer}>
                        <Image
                          src={cartItem.productDetails.image}
                          layout="fill"
                          objectFit="contain"
                          alt=""
                        />
                      </div>
                    </td>
                    <td>
                      <span className={styles.name}>
                        {cartItem.productDetails.title}
                      </span>
                    </td>
                    <td>
                      {cartItem.extras.map((extra, i) => (
                        <span key={i} className={styles.extras}>
                          {extra.text}
                          {i < cartItem.extras.length - 1 && (
                            <span className="mx-1">,</span>
                          )}
                        </span>
                      ))}
                    </td>
                    <td>
                      <span className={styles.price}>
                        {cartItem.price.toFixed(2)} L.E
                      </span>
                    </td>
                    <td>
                      <span className={styles.quantity}>
                        {cartItem.quantity}
                      </span>
                    </td>
                    <td>
                      <span className={styles.total}>
                        {cartItem.total.toFixed(2)}
                        L.E
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.wrapper}>
            <h2 className={styles.title}>CART TOTAL</h2>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Subtotal:</b>
              <b className={styles.totalTextValue}>{total.toFixed(2)} L.E</b>
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Discount:</b>
              <b className={styles.totalTextValue}>{discount.toFixed(2)} L.E</b>
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Total:</b>
              <b className={styles.totalTextValue}>
                {(total - discount).toFixed(2)} L.E
              </b>
            </div>

            {paymentVisibilty ? (
              <div className={styles.paymentWrapper}>
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "Adkb0VdBDmGesgwYj8ullKm8AfRGA1Sa9ClRku2P0dUmV2PAPEZw877TYji5iwoa7rcEMq-qVJr6kEce",
                    components: "buttons",
                    currency: "USD",
                    "disable-funding": "credit,card,p24",
                  }}
                >
                  <Paypal createOrder={createOrder} />
                </PayPalScriptProvider>
                <button
                  onClick={() => {
                    if (total > 0) setShowCashOnDelivery(true);
                  }}
                  className={styles.cash}
                >
                  CASH ON DELIVERY
                </button>
              </div>
            ) : (
              <button
                onClick={() =>
                  setPaymentVisibilty((paymentVisibilty) => !paymentVisibilty)
                }
                className={styles.checkout}
              >
                CHECKOUT NOW!!
              </button>
            )}
          </div>
        </div>
      </div>
      <CashOnDeliveryModal
        show={showCashOnDelivery}
        onHide={() => setShowCashOnDelivery(false)}
        createOrder={createOrder}
        total={total}
      />
    </Container>
  );
}
