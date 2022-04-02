import AddPizza from "components/AddPizza";
import Featured from "components/HOME/Featured";
import Head from "next/head";
import PizzaList from "components/HOME/PRODUCTS/PizzaList";
import axios from "axios";
export default function Home({ pizzaList, admin }) {
  return (
    <div>
      <Head>
        <title>Pizza Store</title>
        <meta name="description" content="order pizza from here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddPizza />}
      <PizzaList pizzaList={pizzaList} />
    </div>
  );
}
export const getServerSideProps = async (ctx) => {
  let res = await axios(`https://pizza-sooty.vercel.app/api/products`);
  let admin = false;
  const myCookies = ctx.req?.cookies || "";
  if (myCookies.token === process.env.TOKEN) {
    admin = true;
  }
  return {
    props: { pizzaList: res.data, admin },
  };
};
