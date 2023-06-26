import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Button, Card, CardContent, Container, FormGroup, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState('');
    const [preview, setPreview] = useState('');
    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    }
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const saveProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/products', {
                name: name,
                file: file,
                price: price
            }, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            });
            navigate('/');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <Container maxWidth='lg' sx={{ mt: { xs: '2.5rem', md: '5rem' } }}>
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography
                                variant='h5'
                                sx={{
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mb: '2.5rem'
                                }}
                            >Tambah Produk</Typography>
                            <form onSubmit={saveProduct}>
                                <p style={{ background: 'red', color: '#fff', fontWeight: 'bold' }}>{msg}</p>
                                <FormGroup sx={{ mb: '1.3rem' }}>
                                    <TextField id="outlined-basic" label="Product Name" variant="outlined" type='text' value={name} onChange={(e) => setName(e.target.value)} />
                                </FormGroup>
                                <FormGroup sx={{ mb: '1.3rem' }}>
                                    <TextField id="outlined-basic" label="Product Price" variant="outlined" type='text' value={price} onChange={(e) => setPrice(e.target.value)} />
                                </FormGroup>
                                <FormGroup sx={{ mb: '1.3rem' }}>
                                    <label style={{ fontWeight: 'bold', background: 'red', color: '#fff', padding: '5px', width: '100px' }} for="img-product">Pilih Gambar</label>
                                    <input type="file" id='img-product' onChange={loadImage} style={{ display: 'none' }} />
                                    {preview ? (
                                        <img src={preview} alt="preview" style={{ width: '100%', height: '100%', marginTop: '1rem' }} />
                                    ) : (
                                        <div style={{
                                            border: '2px solid #000',
                                            marginTop: '1rem',
                                            padding: '5px',
                                            width: '98%',
                                            height: '250px',
                                            borderRadius: '2%'
                                        }}>Preview Image</div>
                                    )}
                                </FormGroup>
                                <FormGroup>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button type='submit' variant='contained' sx={{
                                            background: 'green',
                                            color: '#fff',
                                            fontWeight: 'bold',
                                            width: '100px'
                                        }}>Save</Button>
                                    </div>
                                </FormGroup>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default AddProduct