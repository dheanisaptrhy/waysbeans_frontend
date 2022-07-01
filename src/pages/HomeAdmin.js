import React, { useState } from 'react'
import { Col, Container, Modal, Row, Table } from 'react-bootstrap'
import NavbarAdmin from '../components/navbar/NavbarAdmin'
import { useNavigate } from 'react-router-dom'
import pagecss from '../styles/Pages.module.css'
import { useMutation, useQuery } from 'react-query'
import { API } from '../config/api'

function HomeAdmin() {
    const { btnActionAdd, btnActionDelete, btnActionEdit, btnYes, btnNo, headingBlack, headingTitle } = pagecss

    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const [idDelete, setIdDelete] = useState(null)

    // fetch data
    let { data: products, refetch } = useQuery('productsCache', async () => {
        const response = await API.get('/products')
        return response.data.data
    })

    const handleUpdate = (id) => {
        navigate('/editproduct/' + id)
    }
    const handleDelete = (id) => {
        setIdDelete(id)
        handleShow()
    }

    const deleteById = useMutation(async (id) => {
        try {
            await API.delete(`/product/${id}`)
            refetch()
        } catch (error) {
            console.log(error);
        }
    })

    const handleConfirmDelete = () => {
        deleteById.mutate(idDelete)
        handleClose()
    }
    return (
        <div>
            <div>
                <NavbarAdmin />
            </div>
            <Container className='mt-5'>
                <Row className='mb-3'>
                    <Col xs={10}>
                        <h4 style={{
                            color: "#613D2B",
                            fontWeight: "700"
                        }}>List Product</h4>
                    </Col>
                    <Col xs={2}>
                        <button className={btnActionAdd}
                            onClick={() => navigate('/addproduct')}>Add</button>
                    </Col>
                </Row>
                {products?.length !== 0 ? (
                    <Table striped bordered hover variant="secondary">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Photo</th>
                            <th>Product Name</th>
                            <th>Product Desc</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((data, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <img
                                        src={data.image}
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'cover'
                                        }} 
                                        alt={data.name}/>
                                </td>
                                <td>{data.title}</td>
                                <td>{data.desc}</td>
                                <td>{data.price}</td>
                                <td>{data.qty}</td>
                                <td>
                                    <button className={btnActionEdit}
                                        onClick={() => handleUpdate(data.id)}>Edit</button>
                                    <button className={btnActionDelete} onClick={() => handleDelete(data.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                ):(
                    <div className='pt-5 d-flex justify-content-center align-items-center'>
                        <h2 className={headingTitle}>No data product</h2>
                    </div>
                )}
                
            </Container>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Body>
                    <h4 className={headingBlack}>Delete Data</h4>
                    <p>Are you sure want to delete this data?</p>
                    <div className='d-flex justify-content-end'>
                        <button className={btnYes} onClick={handleConfirmDelete}>Yes</button>
                        <button className={btnNo} onClick={handleClose}>No</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default HomeAdmin