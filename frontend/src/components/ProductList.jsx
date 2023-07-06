import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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

    const navigate = useNavigate();

    const updateProduct = async (productId) => {
        await axios.get(`http://localhost:5000/products/${productId}`);
        navigate(`/editProduct/${productId}`);
    }
    return (
        <Layout>
            <Container maxWidth="lg" sx={{ mt: { xs: '2.5rem', md: '5rem' } }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} sx={{ ml: { xs: '0', md: '1rem' } }}>
                        <Button
                            variant='contained'
                            href='/addProduct'
                            sx={{
                                background: 'green',
                                color: '#fff',
                                "&:hover": {
                                    background: '#fff',
                                    color: 'green'
                                }
                            }}
                        >
                            Tambah Produk
                        </Button>
                    </Grid>
                    {products.map((product) => (
                        <Grid item xs={6} md={3} sx={{ display: 'flex', justifyContent: 'center' }} key={product.id}>
                            <Card>
                                <CardMedia
                                    sx={{
                                        height: { xs: 140, md: 250 },
                                        width: { xs: 140, md: 250 }
                                    }}
                                    image={product.url}
                                />

                                {/* <video id="video" controls controlsList="nodownload" style={{ width: "auto" }}>
                                    <source src={product.url} id="video" />
                                </video> */}

                                {/* <audio controls autoplay>
                                    <source src={product.url} type="audio/ogg"></source>
                                </audio> */}
                                <CardContent>
                                    <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                                        {product.name}
                                    </Typography>
                                    <Typography variant='body2'>
                                        Rp.{product.price.toLocaleString()}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ margin: '5px' }}>
                                    <Button type='submit' variant='contained' onClick={() => deleteProduct(product.id)} sx={{
                                        background: '#CD1818',
                                        color: '#fff',
                                        "&:hover": {
                                            background: '#fff',
                                            color: '#CD1818'
                                        }
                                    }}>Hapus</Button>
                                    <Button type='submit' variant='contained' onClick={() => updateProduct(product.id)} sx={{
                                        background: 'blue',
                                        color: '#fff',
                                        "&:hover": {
                                            background: '#fff',
                                            color: 'blue'
                                        }
                                    }}>Edit</Button>
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