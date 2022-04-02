import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import { useEffect } from "react";
import { useSelector } from "react-redux";

// Custom component to wrap the PayPalButtons and handle currency changes
export default function Paypal({ createOrder }) {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const style = { layout: "vertical" };
  const currency = "USD";
  const showSpinner = true;
  const { total } = useSelector((state) => state.cart);
  const amount = total.toFixed(2);

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function (details) {
            const shipping = details.purchase_units[0].shipping;
            createOrder({
              customer: shipping.name.full_name,
              adress: shipping.address.address_line_1,
              total,
              paymentMethode: 1,
            });
          });
        }}
        onError={function (err) {
          console.log(err);
        }}
      />
    </>
  );
}
