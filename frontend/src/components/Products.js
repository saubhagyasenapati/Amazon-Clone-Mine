import React, { Fragment,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getProduct } from '../actions/productAction'
import Loader from './Layout/Loader/Loader'
import Product from './Product'

const Products = () => {
    const dispatch=useDispatch();
    const{products,loading,error,productCount}=useSelector(state=>state.products)
    useEffect(() => {
      dispatch(getProduct());
    }, [dispatch])
    
  return (
    <Section>
        <div className='Heading'>
        <h2>Products</h2>
        </div>
        <div className="Products">
        {loading?<Loader/>:<div className='product'>
       
       {products && products.map((product,i) => (<div><Product key={i}product={product} /></div>))}
          </div>
              }
        </div>
    
    </Section>
        
    
  )
}

export default Products

const Section=styled.section`
display:grid ;
grid-template-rows:5vmax 95vmax;
.Products{

    .product{
      display:grid ;
      grid-template-columns:auto auto auto auto;
      margin:10px;
    }
}
`