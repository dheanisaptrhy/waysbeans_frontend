import React, { useContext, useState } from 'react'
import { Container, Form, Button, Modal, Alert } from 'react-bootstrap'
import loginCSS from '../../styles/Auth.module.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { useMutation } from 'react-query'

import { API } from '../../config/api'


export default function Login({ show, handleClose, setRegister }) {
    const { main, miniContainer, loginH1, button, klikHere, textKlik, input } = loginCSS

    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const { email, password } = form
    const [message, setMessage] = useState(null)
    const [state, dispatch] = useContext(UserContext)

    //set open modal register
    const handleRegister = () => {
        setRegister(true)
    }

    // handlechange
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // handle submit
    const handleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }

            const body = JSON.stringify(form)
            const response = await API.post('/login', body, config)
            console.log(response);
            if (response?.status === 200) {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: response.data.data
                })
                if (response.data.data.status === 'admin') {
                    navigate('/homeadmin')
                } else {
                    navigate('/home')
                }

                const alert = (
                    <Alert variant="success" className='py-1'>
                        Login Success
                    </Alert>
                )
                setMessage(alert)
            }
        } catch (error) {
            const alert = (
                <Alert variant="danger" className='py-1'>
                    Failed
                </Alert>
            )
            setMessage(alert)
            console.log(error);
        }
    })
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Body>
                <div>
                    <div className={miniContainer}>
                        <div>
                            <h2 className={loginH1}>Login</h2>
                        </div>
                        {message && message}
                        <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
                            <input
                                className={input}
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                value={email} />
                            <input
                                className={input}
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={password} />
                            <button className={button} type="submit">
                                Login
                            </button>
                        </form>
                        <div className={textKlik}>
                            <p>Don't have account ? Klik <Button variant="link" onClick={handleRegister} className={klikHere}>Here</Button></p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
