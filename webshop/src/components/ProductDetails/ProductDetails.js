import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from '../../contexts/AppContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import URL from '../../constants/url';
import Product from '../Product/Product';

import { Paper, Typography, Grid } from '@material-ui/core';
import useStyles from './styles';

const ProductDetails = () => {

    const [product, setProduct] = useState({});

    const [recProducts, setRecProducts] = useState([]);
    const { productToggle } = useContext(AppContext);

    const classes = useStyles();
    const { asin } = useParams();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const { data } = await axios.get(`${URL}/product?asin=${asin}`);
                console.log(data);
                setProduct(data[0]);
            } catch (error) {
                console.log(error);
            }
        }
        const fetchRecProductDetails = async () => {
            try {
                const { data } = await axios.get(`${URL}/recommend?asin=${asin}`);
                console.log("rec", data);
                setRecProducts(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProductDetails();
        fetchRecProductDetails();
    }, [productToggle]);


    return (
        <>
            <div className={classes.toolbar} />
            <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
                <div className={classes.card}>
                    <div className={classes.section}>
                        <Typography variant="h3" component="h2">{product.title}</Typography>
                        <Typography gutterBottom variant="body1" component="p">{product.description}</Typography>
                    </div>
                    <div className={classes.imageSection}>
                        <img className={classes.media} src={product.imUrl} alt={product.title} />
                        <Typography variant='h4' align='center'>${product.price}</Typography>
                    </div>
                </div>
                {recProducts.length ? (
                    <>
                        <Typography variant='h2' align='center' gutterBottom color='primary'>You Might Also Like</Typography>
                        <Grid container justifyContent="center" spacing={4}>
                            {recProducts.map((product) => (
                                <Grid item key={product.asin} xs={12} sm={6} md={4} lg={3}>
                                    <Product product={product} />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                ) : (<span></span>)}
            </Paper>
        </>
    )
}

export default ProductDetails;