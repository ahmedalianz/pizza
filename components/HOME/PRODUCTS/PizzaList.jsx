import { Container } from "react-bootstrap";
import PizzaCard from "./PizzaCard";
import styles from "styles/PizzaList.module.css";

export default function PizzaList({ pizzaList }) {
  return (
    <div id="products">
      <Container className={styles.container}>
        <h1 className={styles.title}>Best Pizza in Town</h1>
        <p className={styles.desc}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis cum
          reprehenderit dolorum ratione officia delectus sint qui nemo, et
          suscipit aliquid blanditiis molestiae consectetur amet? Omnis sunt
          aspernatur molestiae ab.
        </p>
        <div className={styles.listWrapper}>
          {pizzaList.length > 0 &&
            pizzaList.map((pizza) => (
              <PizzaCard pizza={pizza} key={pizza._id} />
            ))}
        </div>
      </Container>
    </div>
  );
}
