import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import pagecss from '../styles/Pages.module.css'
import NavbarAdmin from '../components/navbar/NavbarAdmin'
import fileIcon from '../assets/Thumbnail.png'
import { useNavigate } from 'react-router-dom'
import { API } from '../config/api'
import { useMutation } from 'react-query'

function AddProduct() {
    const { input, button, btnActionUpload } = pagecss
    const navigate = useNavigate()

    const [preview, setPreview] = useState(null)
    const [form, setForm] = useState({
        title: "",
        desc: "",
        price: "",
        qty: "",
        image: ""
    })

    // handle change form
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
        })

        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0])
            setPreview(url)
        }
    }

    // handle submit
    const handleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            };

            const formData = new FormData()
            formData.set('image', form.image[0], form.image[0].name)
            formData.set('title', form.title)
            formData.set('desc', form.desc)
            formData.set('price', form.price)
            formData.set('qty', form.qty)

            const response = await API.post('/product', formData, config)
            console.log(response.data.data);

            navigate('/homeadmin')
        } catch (error) {
            console.log(error);
        }
    })
    return (
        <div>
            <div>
                <NavbarAdmin />
            </div>
            <Container className='mt-5 d-flex justify-content-center align-items-center'>
                <Row>
                    <Col xs={6} className="mt-3">
                        <h4 style={{
                            color: "#613D2B",
                            fontWeight: "700",
                            marginTop: '12px'
                        }}>Add Product</h4>
                        <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
                            <input
                                className={input}
                                type="text"
                                placeholder="Name"
                                name="title"
                                onChange={handleChange} />
                            <input
                                className={input}
                                type="number"
                                placeholder="Stock"
                                name="qty"
                                onChange={handleChange} />
                            <input
                                className={input}
                                type="number"
                                placeholder="Price"
                                name="price"
                                onChange={handleChange} />
                            <textarea
                                className={input}
                                placeholder="Description Product"
                                name="desc"
                                onChange={handleChange}
                                rows='4' />
                            <label for="image" className={btnActionUpload}>
                                Photo Product
                                <img src={fileIcon} className='ms-4' />
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleChange}
                                hidden />
                            <div className='d-flex justify-content-center mt-3'>
                                <button className={button} type="submit">
                                    Add Product
                                </button>
                            </div>
                        </form>
                    </Col>
                    <Col xs={6} className="d-flex justify-content-center">
                        {preview && (
                            <img src={preview} style={{
                                width: "25rem",objectFit:"cover"
                            }} />
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AddProduct