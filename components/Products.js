//styled components
import { ProductStyle } from '../styles/ProductStyle'; 
//Navigation between pages
import Link from 'next/link';

export default function Product({product}) {
  //extracting info from props
  const { Title, Price, Image, Slug } = product.attributes;

  return (
    <ProductStyle>
      <Link href={`/product/${Slug}`}>
        <div>
          <img src={Image.data.attributes.formats.small.url} alt="photo" />
        </div>
      </Link>
      <h2>{Title}</h2>
      <h3>£{Price}</h3>
    </ProductStyle>
  )
}

