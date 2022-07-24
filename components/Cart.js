import { useStateContext } from '../lib/context';
import { 
  CartWrapper, 
  CartStyle, 
  Card, 
  CardInfo, 
  EmptyStyle, 
  Checkout,
  Cards, 
}  from '../styles/CartStyles';
import { Quantity } from '../styles/ProductDetails';
import { BsCartCheck } from 'react-icons/bs';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import getStripe from '../lib/getStripe';



//Animation variants
const card = {
  hidden: { opacity: 0, scale: .8 },
  show: { opacity: 1, scale: 1 },
  
}

const cards = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    }
  },

}

export default function Cart(){
  const { cartItems, setShowCart, onAdd, onRemove, totalPrice } = useStateContext();

  //Payment with stripe
  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch('/api/stripe', {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(cartItems),
    });
    const data = await response.json();
    await stripe.redirectToCheckout({ sessionId: data.id })
  }

  return (
    <CartWrapper 
      animate={{opacity: 1}}
      initial={{opacity: 0}}
      exit={{ opacity: 0}}
      onClick={() => setShowCart(false)}
    >
      <CartStyle 
        initial={{x: '50%'}}
        animate={{x: '0%'}}
        exit={{ x: '50%' }}
        transition={{type: 'tween'}}
        onClick={(e) => e.stopPropagation() }
      >
        {cartItems.length < 1 && ( 
        <EmptyStyle
          initial={{opacity: 0, scale: .8 }}
          animate={{opacity: 1, scale: 1 }}
          transition={{delay: .2}}
        >
          <h1>Your cart is empty</h1>
          <BsCartCheck />
        </EmptyStyle>
        )}
        <Cards 
          variants={cards}
          initial="hidden"
          animate="show"
          layout
        >
          {cartItems.length >= 1 && 
            cartItems.map((item) => {
              return (
                <Card 
                  key={item.Slug}
                  variants={card}
                  layout
                >
                  <img src={item.Image.data.attributes.formats.thumbnail.url} alt={item.Title} />
                  <CardInfo>
                    <h3>{item.Title}</h3>
                    <h3>£{item.Price}</h3>
                    <Quantity>
                    <span>Quantity</span>
                      <button onClick={() => onRemove(item)}>
                        <AiFillMinusCircle />
                      </button>
                        <p>{ item.quantity }</p>
                      <button onClick={() => onAdd(item, 1)}>
                        <AiFillPlusCircle />
                      </button>
                    </Quantity>
                  </CardInfo>
                </Card>
              );
            })}
        </Cards>

          {cartItems.length >= 1 && (
            <Checkout 
            layout
            >
              <h3>Subtotal: £{totalPrice}</h3>
              <button  onClick={handleCheckout}>Purchase</button>
            </Checkout>
          )}

      </CartStyle>
    </CartWrapper>
  );
}