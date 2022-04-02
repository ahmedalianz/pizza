import { Button } from "react-bootstrap";
import axios from "axios";
import { deleteAdminOrder } from "redux/admin";
import styles from "styles/Admin.module.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function AdminOrderCell({ order, index }) {
  const dispatch = useDispatch();
  const [orderStatus, setOrderStatus] = useState(order.status);
  const moveOrderToNextStage = async () => {
    try {
      let res = await axios.patch(
        `${process.env.API_URL}/orders/${order._id}`,
        {
          status: orderStatus + 1,
        }
      );
      if (res.status === 200)
        orderStatus < 3 && setOrderStatus((prev) => prev + 1);
    } catch (e) {
      console.log(e);
    }
  };
  const cancelOrder = async () => {
    try {
      await axios.delete(`${process.env.API_URL}/orders/${order._id}`);
      toast.success(`Order cancelled`);
      dispatch(deleteAdminOrder(order._id));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <span className={styles.name}>{order.customer}</span>
      </td>
      <td>
        <span className={styles.adress}>
          {order.adress} {order.phone && "-"} {order?.phone}
        </span>
      </td>
      <td>
        <span className={styles.total}>{order.total.toFixed(2)}</span>
      </td>
      <td>
        <span className={styles.payment}>
          {order.paymentMethode === 1 ? "Visa" : "Cash"}
        </span>
      </td>
      <td>
        <span className={styles.status}>
          {orderStatus === 0
            ? "Preparing"
            : orderStatus === 1
            ? "In Progress"
            : orderStatus === 2
            ? "On The Way"
            : "Deliverd"}
        </span>
      </td>
      <td>
        <span className={styles.actions}>
          <Button onClick={moveOrderToNextStage} variant="success">
            Next Stage
          </Button>
          <Button variant="danger" onClick={cancelOrder}>
            Cancel
          </Button>
        </span>
      </td>
    </tr>
  );
}
