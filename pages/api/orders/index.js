import Order from "models/order";
import dbConnect from "util/mongodb";

const ordersApi = async (req, res) => {
  const { method } = req;
  await dbConnect();
  if (method === "GET") {
    try {
      const allOrders = await Order.find();
      res.status(200).json(allOrders);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};
export default ordersApi;
