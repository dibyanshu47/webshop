import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from '../../contexts/AppContext';
import axios from 'axios';
import { Grid, Typography } from '@material-ui/core';

import URL from '../../constants/url';

import Product from '../Product/Product';

import useStyles from './styles';

const Home = () => {

    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const { setSearchItem } = useContext(AppContext);

    useEffect(() => {
        setSearchItem('');
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(`${URL}/most-popular`);
                setProducts(data);
                // console.log(data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchProducts();
    }, [])

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Typography variant='h2' align='center' gutterBottom color='primary'>Most Popular</Typography>
            <Grid container justifyContent="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.asin} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Home;