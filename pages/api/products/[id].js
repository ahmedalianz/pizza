import Product from "models/product";
import dbConnect from "util/mongodb";

const singleProductApi = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;
  await dbConnect();
  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
  if (method === "PATCH") {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
    try {
      const product = await Product.findByIdAndDelete(id);
      res.status(200).json(product);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};

export default singleProductApi;
