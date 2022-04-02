import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import AdminOrderCell from "/components/ADMIN/AdminOrderCell";
import AdminProductCell from "/components/ADMIN/AdminProductCell";
import axios from "axios";
import { setProductsOrders } from "../../redux/admin";
import styles from "/styles/Admin.module.css";
import { useEffect } from "react";

export default function Admin({ products, orders }) {
  const dispatch = useDispatch();
  const { adminProducts, adminOrders } = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(setProductsOrders({ products, orders }));
  }, [dispatch, orders, products]);
  return (
    <Container>
      <Row className={styles.container}>
        <Col>
          <div className={styles.title}>Products</div>
          <Table responsive="md" striped bordered className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Name</th>
                <th>Extras</th>
                <th>Prices</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {adminProducts.map((product, i) => (
                <AdminProductCell key={i} index={i} product={product} />
              ))}
            </tbody>
          </Table>
        </Col>
        <Col>
          <div className={styles.title}>Orders</div>
          <Table responsive="md" striped bordered className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Adress - Phone</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {adminOrders.map((order, i) => (
                <AdminOrderCell key={i} index={i} order={order} />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
export const getServerSideProps = async (ctx) => {
  const myCookies = ctx.req?.cookies || "";
  if (myCookies.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  let res1 = await axios(`${process.env.API_URL}/products`);
  let res2 = await axios(`${process.env.API_URL}/orders`);
  return {
    props: { products: res1.data, orders: res2.data },
  };
};
