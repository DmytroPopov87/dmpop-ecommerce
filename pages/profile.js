import { useRouter } from "next/router";
const stripe = require('stripe')(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import styled from "styled-components";
//money format
import formatMoney from "../lib/formatMoney";


export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = getSession(ctx.req, ctx.res);
    const stripeId = session.user[`${process.env.BASE_URL}/stripe_customer_id`]
    const paymentIntents = await stripe.paymentIntents.list({
      customer: stripeId,
    });
    return { props: { orders: paymentIntents.data } };
  },
});

export default function Profile({ user, orders }) {
  const route = useRouter();
  return(
    user && (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <div>
          <LogoutBtn>
            <button onClick={() => route.push("api/auth/logout")}>  Logout</button>
          </LogoutBtn>
          {orders.map((order) => (
            <Order>
              <h1>Order Number: <span>{order.id}</span> </h1>
              <h2>Amount: <span>{ formatMoney(order.amount) }</span> </h2>
              <h2>Receipt Email: <span>{user.email}</span> </h2>
            </Order>
          ))}
        </div>
       
      </div>
    )
  );
}



// export const withPageAuthRequired(PremiumContent() {}) another sample to secure page


const Order = styled.div`
  background: white;
  margin: 1.5rem 0rem;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  h1, h2 {
    font-size: .9rem;
  }
  span {
    font-weight: 600;
  }
`;

const LogoutBtn = styled.div`
    button {
    background: var(--primary);
    margin-top: .3rem;
    width: 9%;
    padding: .6rem;
    cursor: pointer;
    color: white;
    border: none;
  }
`;