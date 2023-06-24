import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Style
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2';
import Layout from '../Layout/Layout';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';


const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
    }

    const deleteProduct = async (productId) => {
        await axios.delete(`http://localhost:5000/products/${productId}`);
        getProducts();
    }
    return (
        <Layout>
            <Container maxWidth="lg" sx={{ mt: { xs: '2.5rem', md: '5rem' } }}>
                <Grid container spacing={2}>
                    {products.map((product) => (
                        <Grid item xs={6} md={3} sx={{ display: 'flex', justifyContent: 'center' }} key={product.id}>
                            <Card>
                                <CardMedia
                                    sx={{
                                        height: 200,
                                        width: 200
                                    }}
                                    image={product.url}
                                />
                                <CardContent>
                                    <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                                        {product.name}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button type='submit' onClick={() => deleteProduct(product.id)} sx={{
                                        background: '#CD1818',
                                        color: '#fff',
                                        "&:hover": {
                                            background: '#fff',
                                            color: '#CD1818',
                                            border: '2px solid #CD1818'
                                        }
                                    }}>Hapus</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Layout>
    )
}

export default ProductList