import { Form } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { addToCart } from "../../redux/cart";
import axios from "axios";
import styles from "styles/Product.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function Product({ pizza }) {
  const [price, setPrice] = useState(pizza.prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const dispatch = useDispatch();

  const changeSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };
  const addTopping = (e, option) => {
    const checked = e.target.checked;
    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };
  const changePrice = (difference) => {
    setPrice(price + difference);
  };
  const addProductToCart = () =>
    dispatch(addToCart({ product: pizza, price, extras, quantity }));
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <div className={styles.imgContainer}>
          <Image src={pizza.image} alt="" layout="fill" objectFit="contain" />
        </div>
      </div>

      <div className={styles.rightSide}>
        <h1 className={styles.title}>{pizza.name}</h1>
        <span className={styles.price}>{price.toFixed(2)} L.E</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose Your Desired Size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => changeSize(0)}>
            <Image src="/images/size.webp" alt="" layout="fill" />
            <span className={styles.sizeNumber}>Small</span>
          </div>
          <div className={styles.size} onClick={() => changeSize(1)}>
            <Image src="/images/size.webp" alt="" layout="fill" />
            <span className={styles.sizeNumber}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => changeSize(2)}>
            <Image src="/images/size.webp" alt="" layout="fill" />
            <span className={styles.sizeNumber}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose Your Desired Toppings</h3>
        <div className={styles.toppings}>
          {pizza.extraOptions.map((option, i) => (
            <div className={styles.topping} key={option._id}>
              <Form.Check
                type="checkbox"
                id={option._id}
                label={option.text}
                onChange={(e) => addTopping(e, option)}
              />
            </div>
          ))}
        </div>

        <div className={styles.addCart}>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Link href="/cart" passHref>
            <button onClick={addProductToCart}>Add To Cart</button>
          </Link>
        </div>
      </div>
      <div className={styles.descContainer}></div>
    </div>
  );
}
export const getServerSideProps = async ({ params }) => {
  let res = await axios(`${process.env.API_URL}/products/${params.id}`);
  console.log(res);
  return {
    props: { pizza: res.data },
  };
};
