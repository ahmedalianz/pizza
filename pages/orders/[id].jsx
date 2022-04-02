import { Container, Table } from "react-bootstrap";

import Image from "next/image";
import axios from "axios";
import importedStyles from "styles/Cart.module.css";
import styles from "styles/Order.module.css";

export default function Order({ order }) {
  const status = 0;
  const statusCase = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.waiting;
  };
  return (
    <Container>
      <div className={importedStyles.container}>
        <div className={importedStyles.leftSide}>
          <div>
            <Table responsive="md" striped bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Adress</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2</td>
                  <td>
                    <span className={styles.orderId}>{order._id}</span>
                  </td>
                  <td>
                    <span className={styles.customer}>{order.customer}</span>
                  </td>
                  <td>
                    <span className={styles.adress}>{order.adress}</span>
                  </td>
                  <td>
                    <span className={styles.order}>
                      {order.total.toFixed(2)} L.E
                    </span>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className={styles.statusWrapper}>
            <div className={statusCase(0)}>
              <Image
                src="/images/paid.png"
                alt=""
                width="100"
                height="100"
                objectFit="contain"
              />
              <span>Payment</span>
              <div className={styles.checkedIcon}>
                <Image
                  src="/images/checked.png"
                  alt=""
                  width="30"
                  height="30"
                />
              </div>
            </div>
            <div className={statusCase(1)}>
              <Image
                src="/images/preparing.png"
                alt=""
                width="100"
                height="100"
                objectFit="contain"
              />
              <span>Preparing</span>
              <div className={styles.checkedIcon}>
                <Image
                  src="/images/checked.png"
                  alt=""
                  width="30"
                  height="30"
                />
              </div>
            </div>
            <div className={statusCase(2)}>
              <Image
                src="/images/bike.png"
                alt=""
                width="100"
                height="100"
                objectFit="contain"
              />
              <span>On the Way</span>
              <div className={styles.checkedIcon}>
                <Image
                  src="/images/checked.png"
                  alt=""
                  width="30"
                  height="30"
                />
              </div>
            </div>
            <div className={statusCase(3)}>
              <Image
                src="/images/delvered.webp"
                alt=""
                width="100"
                height="100"
                objectFit="contain"
              />
              <span>Delivered</span>
              <div className={styles.checkedIcon}>
                <Image
                  src="/images/checked.png"
                  alt=""
                  width="30"
                  height="30"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={importedStyles.rightSide}>
          <div className={importedStyles.wrapper}>
            <h2 className={importedStyles.title}>ORDER TOTAL</h2>
            <div className={importedStyles.totalText}>
              <b className={importedStyles.totalTextTitle}>Subtotal:</b>
              {order.total.toFixed(2)} L.E
            </div>
            <div className={importedStyles.totalText}>
              <b className={importedStyles.totalTextTitle}>Discount:</b>
              0.00 L.E
            </div>
            <div className={importedStyles.totalText}>
              <b className={importedStyles.totalTextTitle}>Total:</b>
              {order.total.toFixed(2)} L.E
            </div>
            <button disabled className={styles.orderButton}>
              PAID
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
export const getServerSideProps = async ({ params }) => {
  let res = await axios(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`
  );
  console.log(res);
  return {
    props: { order: res.data },
  };
};
