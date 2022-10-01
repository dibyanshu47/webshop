import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { Card, CardMedia, CardContent, Typography, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './styles';

const Product = ({ product }) => {

    const classes = useStyles();
    const link = `/product/${product.asin}`;
    const { setProductToggle } = useContext(AppContext);

    return (
        <Card className={classes.root}>
            <Box component={Link} to={link} onClick={() => setProductToggle(prev => !prev)}>
                <CardMedia className={classes.media} image={product.imUrl} title={product.title} />
            </Box>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.title}
                    </Typography>
                    <Typography variant="h5">
                        ${product.price}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" />
            </CardContent>
        </Card>
    )
}

export default Product;