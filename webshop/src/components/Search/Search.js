import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { Typography, CircularProgress, Grid } from '@material-ui/core';
import Product from '../Product/Product';

import URL from '../../constants/url';

import useStyles from './styles';
import axios from 'axios';

const Search = () => {

    const classes = useStyles();

    const { searchItem, searchToggle } = useContext(AppContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(`${URL}/search?item=${searchItem}`);
                console.log(data);
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProducts();
    }, [searchToggle]);

    if (loading) {
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <CircularProgress />
            </main>
        );
    }

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            {
                products.length ? (
                    <>
                        <Typography variant='h2' align='center' gutterBottom color='primary'>Search Results</Typography>
                        <Grid container justifyContent="center" spacing={4}>
                            {products.map((product) => (
                                <Grid item key={product.asin} xs={12} sm={6} md={4} lg={3}>
                                    <Product product={product} />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                ) : (
                    <Typography variant='h2' align='center' gutterBottom color='secondary'>Sorry! Couldn't get what you are looking for :(</Typography>
                )
            }
        </main>
    )
}

export default Search