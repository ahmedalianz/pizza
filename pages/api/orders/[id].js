import Order from "models/order";
import dbConnect from "util/mongodb";

const singleOrderApi = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;
  await dbConnect();
  if (method === "GET") {
    try {
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
  if (method === "PATCH") {
    try {
      req.body.status < 4 && (await Order.findByIdAndUpdate(id, req.body));
      res.status(200).send("Order updated");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
    try {
      const order = await Order.findByIdAndDelete(id);
      res.status(200).json(order);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};

export default singleOrderApi;
