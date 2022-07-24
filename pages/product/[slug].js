import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
//styled components
import { DetailsStyle, ProductInfo, Quantity, Buy } from "../../styles/ProductDetails";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useStateContext } from "../../lib/context";
import toast from 'react-hot-toast';
import { useEffect } from "react";


export default function ProductDetails() {
  //Use State
  const { qty, increaseQty, decreaseQty, onAdd, setQty } = useStateContext();

  //reset qty after adding item to cart
  useEffect(() => {

    setQty(1);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  //create a toast
  const notify = () => {
    toast.success(`${Title} added`, { duration: 1000});
  }

  //Fetch Slug
  const { query } = useRouter();
  
  //Fetch graphQL data
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { Slug: query.slug },
  });

  const {data, fetching, error} = results;

  // //check for the data coming in
  if(fetching) return <p>Loading...</p>
  if(error) return <p>Error: {error.message}</p>
  // console.log(data);
  // //end of check

  // exctract data
  const { Title, Description, Image } = data.products.data[0].attributes;



  return (
    <DetailsStyle>
      <img src={Image.data.attributes.formats.medium.url} alt={Title} />
      <ProductInfo>
        <h3>{Title}</h3>
        <p>{Description}</p>
      
        <Quantity>
          <span>Quantity</span>
          <button><AiFillMinusCircle onClick={ decreaseQty }/></button>
          <p>{ qty }</p>
          <button><AiFillPlusCircle onClick={ increaseQty }/></button>
        </Quantity>
        <Buy onClick={() => {
          onAdd(data.products.data[0].attributes, qty);
          notify();
          }}>Add to cart</Buy>
      </ProductInfo>
    </DetailsStyle>
  ) 
} 