import { Button } from "react-bootstrap";
import Image from "next/image";
import React from "react";
import axios from "axios";
import { deleteAdminProduct } from "redux/admin";
import styles from "styles/Admin.module.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export default function AdminProductCell({ product, index }) {
  const dispatch = useDispatch();
  const deleteProduct = async () => {
    try {
      await axios.delete(
        `https://pizza-sooty.vercel.app/api/products/${product._id}`
      );
      toast.success(`Product Removed successfully`);
      dispatch(deleteAdminProduct(product._id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <tr>
      <td>{index + 1}</td>
      <td style={{ height: "8rem" }}>
        <div className={styles.imgContainer}>
          <Image src={product.image} layout="fill" objectFit="contain" alt="" />
        </div>
      </td>
      <td>
        <span className={styles.name}>{product.title}</span>
      </td>
      <td>
        {product.extraOptions.map((extra, i) => (
          <span key={i} className={styles.extras}>
            {extra.text}
            {i < product.extraOptions.length - 1 && (
              <span className="mx-1">,</span>
            )}
          </span>
        ))}
      </td>
      <td>
        <span className={styles.prices}>
          {product.prices.map((price, i) => (
            <div key={i} className={styles.price}>
              {price}
            </div>
          ))}
        </span>
      </td>
      <td>
        <span className={styles.actions}>
          <Button variant="warning">Edit</Button>
          <Button variant="danger" onClick={deleteProduct}>
            Delete
          </Button>
        </span>
      </td>
    </tr>
  );
}
