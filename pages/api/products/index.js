import Product from "models/product";
import dbConnect from "util/mongodb";

const productsApi = async (req, res) => {
  const { method } = req;
  await dbConnect();
  if (method === "GET") {
    try {
      const allProducts = await Product.find();
      res.status(200).json(allProducts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};
export default productsApi;
