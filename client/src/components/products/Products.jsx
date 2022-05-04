import React from "react";
import Container from "@material-ui/core/Container";
import "./products.css";
import Product from "../product/Product";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default function Products({category, products}) {
  return (
    <Container className="productsBody">
    <div className="menu-title"><h2>{category? products[0].category : "All Products"}</h2></div>
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
