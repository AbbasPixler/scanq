import React from "react";
import Container from "@material-ui/core/Container";
import "./products.css";
import Product from "../product/Product";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useState } from "react";
export default function Products({category, products}) {
  console.log(products)

  const [categoryTitle, setCategoryTitle] = useState();
  return (
    <Container className="productsBody">
      { category ? 
      <div className="category-title">
        <h2>All Products</h2>
        <h3>{ products[0].category }</h3>
      </div>
      : 
      <div className="menu-title"><h2>All Products</h2></div>}
    
    
    <Grid container spacing={2} >
      {products.map(p=>(
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Paper>
      <div className="products">
          <Product product={p}/>
      </div>
      </Paper>
        </Grid> 
        ))}
      </Grid>
    </Container>
  );
}
