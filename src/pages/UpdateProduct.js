import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import pagecss from '../styles/Pages.module.css'
import NavbarAdmin from '../components/navbar/NavbarAdmin'
import fileIcon from '../assets/Thumbnail.png'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import { API } from '../config/api'

function UpdateProduct() {
    const { input, button, btnActionUpload } = pagecss

    // state
    const { id } = useParams()
    const navigate = useNavigate()
    const [preview, setPreview] = useState(null)
    const [form, setForm] = useState({
        title: "",
        desc: "",
        price: "",
        qty: "",
        image: ""
    })

    // get product
    let { data: products, refetch } = useQuery('productsCache', async () => {
        const response = await API.get(`/product/${id}`)
        return response.data.data
    })

    useEffect(()=>{
        if(products){
            setPreview(products.image)
            setForm({
                ...form,
                title: products.title,
                desc: products.desc,
                price: products.price,
                qty: products.qty,
                image: products.image,
            })
        }
    },[products])

    // handlechange
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === 'file' ? e.target.files : e.target.value,
        })
        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    }

    const handleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const formData = new FormData();
            if (form.image) {
                formData.set('image', form?.image[0], form?.image[0]?.name)
            }
            formData.set('title', form.title)
            formData.set('desc', form.desc)
            formData.set('price', form.price)
            formData.set('qty', form.qty)

            const config = {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }

            const response = await API.patch(`/product/${id}`, formData, config)
            console.log(response.data.data);
            navigate(`/homeadmin`)
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
                    <Col xs={6}>
                        <h4 style={{
                            color: "#613D2B",
                            fontWeight: "700",
                            marginTop: '12px'
                        }}>Update Product</h4>
                        <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
                            <input
                                className={input}
                                type="text"
                                placeholder="Name"
                                name="title"
                                onChange={handleChange}
                                value={form?.title} />
                            <input
                                className={input}
                                type="number"
                                placeholder="Stock"
                                name="qty"
                                onChange={handleChange}
                                value={form?.qty} />
                            <input
                                className={input}
                                type="number"
                                placeholder="Price"
                                name="price"
                                onChange={handleChange}
                                value={form?.price} />
                            <textarea
                                className={input}
                                placeholder="Description Product"
                                name="desc"
                                onChange={handleChange}
                                value={form?.desc} />
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
                                    Submit
                                </button>
                            </div>
                        </form>
                    </Col>
                    <Col xs={6}>
                        {preview && (
                            <img src={preview} style={{
                                width: "25rem", objectFit: "cover"
                            }} />
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UpdateProduct