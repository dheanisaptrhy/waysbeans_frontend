import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import NavbarUser from '../components/navbar/NavbarUser'
import bin from '../assets/bin.png'
import photo from '../assets/kopibiru.png'
import pagecss from '../styles/Pages.module.css'
import { CartContext } from '../context/CartContext'
import convertRupiah from "rupiah-format";
import { useMutation } from 'react-query'

export default function Cart() {
    const { buttonBorderless, miniInput, textBrown, headingTitle, button } = pagecss

    const [cartState, cartDispatch] = useContext(CartContext)
    const [total, setTotal] = useState(null)
    const [quantity, setQuantity] = useState(null)

    const handleRemoveItem = (id) => {
        const cartItems = cartState.cartItems.slice()
            .filter((x) => x.id !== id)
        cartDispatch({ type: 'REMOVE_CART', payload: { cartItems } })
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }
    const handlePlus = (id) => {
        const cartItems = cartState.cartItems.slice()
        cartItems.forEach((x) => {
            if (x.id === id) {
                x.count++
            }
        })

        cartDispatch({
            type: "CHANGE_QTY_ADD",
            payload: { cartItems }
        })
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        console.log(cartItems);
    }
    const handleMinus = (id) => {
        const cartItems = cartState.cartItems.slice()
        cartItems.forEach((x) => {
            if (x.id === id) {
                x.count--
            }
        })

        cartDispatch({
            type: "CHANGE_QTY_REMOVE",
            payload: { cartItems }
        })
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        console.log(cartItems);
    }

    // const handlePay = () => {
    const handlePay = useMutation(async () => {
        try {
            // const idSeller = cartState.cartItems.filter((x) => {
            //     return x.user.id
            // })
            // console.log(idSeller);
            const data = {

            }
        } catch (error) {

        }
    })
    // }

    const getCarts = () => {
        const totalPrice = cartState.cartItems.reduce((a, c) => a + c.price * c.count, 0)
        setTotal(totalPrice)
        const totalQuantity = cartState.cartItems.reduce((a, c) => a + c.count, 0)
        setQuantity(totalQuantity)
    }

    useEffect(() => {
        getCarts()
    }, [cartState])

    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = "Client key here ...";

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, [])
    return (
        <div>
            <NavbarUser />
            <Container className='mt-5'>
                <h4 className={headingTitle}>My Cart</h4>
                {cartState.cartItems.length !== 0 ? (
                    <Row className='mt-4'>
                        <Col xs={8}>
                            <h6 className={textBrown}>Review Your Order</h6>
                            <hr style={{
                                border: "2px solid #613D2B"
                            }} />

                            {cartState.cartItems.map((item, index) => (
                                <Row>
                                    <Col xs={9} className='d-flex mb-3'>
                                        <div>
                                            <img src={item.image}
                                                style={{
                                                    maxWidth: '100px',
                                                    maxHeight: '100px',
                                                    objectFit: 'cover',
                                                    marginRight: '10px'
                                                }} />
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <div>
                                                <h6 className={headingTitle}>{item.title}</h6>
                                                <div className='d-flex align-items-center'>
                                                    <button className={buttonBorderless}
                                                        onClick={() => handleMinus(item.id)}>-</button>
                                                    <input
                                                        className={miniInput}
                                                        type="number"
                                                        name="name"
                                                        disabled
                                                        style={{ paddingLeft: "5px" }}
                                                        value={item.count}
                                                    />
                                                    <button className={buttonBorderless}
                                                        onClick={() => handlePlus(item.id)}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={3} className='d-flex justify-content-end  align-items-center'>
                                        <div>
                                            <div className={textBrown}>
                                                {convertRupiah.convert(item.price)}
                                            </div>
                                            <div className='d-flex justify-content-end'>
                                                <button style={{
                                                    border: "none",
                                                    backgroundColor: "transparent"
                                                }}>
                                                    <img src={bin} onClick={() =>
                                                        handleRemoveItem(item.id)
                                                    } />
                                                </button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            ))}

                            <hr style={{
                                border: "2px solid #613D2B"
                            }} />
                        </Col>


                        {/* ======================================= */}

                        <Col xs={4}>
                            <hr style={{
                                border: "2px solid #613D2B",
                                marginTop: '35px'
                            }} />
                            <Row>
                                <Col xs={3}>
                                    <div className={textBrown}>Subtotal</div>
                                    <div className={`mt-2 ${textBrown}`}>Qty</div>
                                </Col>
                                <Col xs={9} className='d-flex justify-content-end'>
                                    <div>
                                        <div className={textBrown}>{convertRupiah.convert(total)}</div>
                                        <div className={`mt-2 d-flex justify-content-end ${textBrown}`}>{quantity}</div>
                                    </div>
                                </Col>
                            </Row>
                            <hr style={{
                                border: "2px solid #613D2B"
                            }} />

                            <Row>
                                <Col>
                                    <h6 className={headingTitle}>Total</h6>
                                </Col>
                                <Col className='d-flex justify-content-end'>
                                    <h6 className={headingTitle}>{convertRupiah.convert(total)}</h6>
                                </Col>
                            </Row>

                            <div className='d-flex justify-content-end'>
                                <button className={button}
                                    style={{
                                        width: '70%',
                                        marginTop: '30px'
                                    }}
                                    onClick={() => handlePay.mutate()}>
                                    {/* onClick={handlePay}> */}
                                    Pay
                                </button>
                            </div>
                        </Col>
                    </Row>
                ) : (
                    <div>Your cart is empty</div>
                )}

            </Container>
        </div>
    )
}
