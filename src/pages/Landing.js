import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import logo from '../assets/Icon.png'
import jumbotron from '../assets/Jumbotron.png'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import authCss from '../styles/Auth.module.css'
import pagecss from '../styles/Pages.module.css'
import { useQuery } from 'react-query'
import { API } from '../config/api'
import convertRupiah from "rupiah-format";


function Landing() {
    const { btnLogin, btnRegis } = authCss
    const { headingTitle, card } = pagecss

    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [login, setLogin] = useState(null)
    const [register, setRegister] = useState(null)

    // fetch data
    let { data: products } = useQuery('productsCache', async () => {
        const response = await API.get('/products')
        return response.data.data
    })

    // modal
    const handleClose = () => setShow(false); //login
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false); //register
    const handleShow2 = () => setShow2(true);

    useEffect(() => {
        if (login) {
            handleClose()
            handleShow2()
            setLogin(null)
        }
    }, [login])
    useEffect(() => {
        if (register) {
            handleClose2()
            handleShow()
            setRegister(null)
        }
    }, [register])

    return (
        <div>
            <div style={{ boxShadow: "0px 5px 10px gray" }}>
                <div style={{ margin: '0 50px', padding: "10px 0" }}>
                    <Row>
                        <Col xs={1} className='d-flex align-items-center'>
                            <div>
                                <img src={logo} />
                            </div>
                        </Col>
                        <Col xs={5}></Col>
                        <Col xs={6} className='d-flex justify-content-end'>
                            <div className='d-flex justify-content-center align-items-center'>
                                <>
                                    <button className={btnLogin} onClick={handleShow}>Login</button>
                                    <button className={btnRegis} onClick={handleShow2}>Register</button>
                                </>
                            </div>
                        </Col>
                    </Row>

                    <Login show={show} handleClose={handleClose} setRegister={setLogin} />
                    <Register show={show2} handleClose={handleClose2} setLogin={setRegister} />
                </div>
            </div>
            <div className='mt-5'>
                <div className='d-flex justify-content-center '>
                    <div>
                        <div>
                            <img src={jumbotron} />
                        </div>

                        <div className='d-flex flex-wrap'>
                            <div className='d-flex flex-wrap'>
                                {products?.map((item, index) => (
                                    <div className='my-3 me-3' key={index.id} onClick={handleShow}>
                                        <div className={card}>
                                            <img src={item.image} className="img-fluid img-rounded" />
                                            <div className='px-3 py-2'>
                                                <div className={headingTitle}>{item.title}</div>
                                                <div>{convertRupiah.convert(item.price)}</div>
                                                <div>Stock : {item.qty}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing