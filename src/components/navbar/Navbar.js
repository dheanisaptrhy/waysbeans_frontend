import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import logo from '../../assets/Icon.png'
import authCss from '../../styles/Auth.module.css'
import Login from '../auth/Login'
import Register from '../auth/Register'


export default function Navbar() {
    const { btnLogin, btnRegis } = authCss

    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [login, setLogin] = useState(null)
    const [register, setRegister] = useState(null)

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
    )
}
