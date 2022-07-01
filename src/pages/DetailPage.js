import React, { useContext, useState } from 'react'
import image from '../assets/kopibiru.png'
import NavbarUser from '../components/navbar/NavbarUser'
import pagecss from '../styles/Pages.module.css'
import { Col, Container, Modal, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { API } from '../config/api'
import convertRupiah from "rupiah-format";
import { CartContext } from '../context/CartContext'

export default function DetailPage() {
    const { buttonBorderless, miniInput, textBrown, headingTitle, button } = pagecss

    const { id } = useParams()
    const navigate = useNavigate()
    const [cartState, cartDispatch] = useContext(CartContext)
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)


    let { data: products, refetch } = useQuery('productsCache', async () => {
        const response = await API.get(`/product/${id}`)
        return response.data.data
    })
    const addCart = () => {
        const cartItems = cartState.cartItems.slice()
        let alreadyExist = false
        cartItems.forEach((x) => {
            if (x.id === products.id) {
                alreadyExist = true;
                x.count++
            }
        })
        if (!alreadyExist) {
            cartItems.push({ ...products, count: 1 })
        }

        cartDispatch({
            type: "ADD_CART",
            payload: { cartItems }
        })
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        handleShow()
        console.log(cartItems);
    }
    return (
        <div>
            <div>
                <NavbarUser />
            </div>
            <Container className='mt-5'>
                <Row>
                    <Col xs={6}>
                        <div className='d-flex justify-content-end'>
                            <img src={products?.image} style={{ width: '30rem', height: '35rem' }} />
                        </div>
                    </Col>
                    <Col xs={6} className="mt-5">
                        <div style={{ width: "85%" }}>
                            <h3 className={headingTitle}>{products?.title}</h3>
                            <p className={textBrown}>Stock : {products?.qty} </p>
                            <p className={textBrown}>{products?.desc}</p>
                            <h5 className={`mt-3 mb-3 d-flex justify-content-end ${headingTitle}`}>{convertRupiah.convert(products?.price)}</h5>
                            <button className={button}
                                style={{ width: "100%" }}
                                onClick={addCart}>
                                Add Cart</button>
                        </div>
                    </Col>
                </Row>

                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Body>
                        <div className='d-flex justify-content-center'
                        style={{
                            color: "#3BB54A"
                        }}>Success Add Product</div>
                    </Modal.Body>
                </Modal>

            </Container>
        </div>
    )
}
