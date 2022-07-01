import React, { useState } from 'react'
import { Alert, Button, Modal } from 'react-bootstrap'
import loginCSS from '../../styles/Auth.module.css'
import { useMutation } from 'react-query'

import { API } from '../../config/api'

export default function Register({ show, handleClose, setLogin }) {
    const { main, miniContainer, loginH1, button, klikHere, textKlik, input } = loginCSS

    const [message, setMessage] = useState(null)
    const [form, setForm] = useState({
        email: '',
        password: '',
        name: ''
    })
    const { email, password, name } = form

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }

            const body = JSON.stringify(form)
            const response = await API.post('/register', body, config)

            if (response.data.status === 'success') {
                const alert = (
                    <Alert variant="success" className='py-1'>
                        Success
                    </Alert>
                )
                setMessage(alert)
                setForm({
                    name: '',
                    email: '',
                    password: ''
                })
            } else {
                const alert = (
                    <Alert variant="danger" className='py-1'>
                        Failed
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

    const handleLogin = () => {
        setLogin(true)
    }
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Body>
                <div>
                    <div className={miniContainer}>
                        <div>
                            <h2 className={loginH1}>Register</h2>
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
                            <input
                                className={input}
                                type="text"
                                placeholder="Fullname"
                                name="name"
                                onChange={handleChange}
                                value={name} />
                            <button className={button} type="submit">
                                Register
                            </button>
                        </form>
                        <div className={textKlik}>
                            <p>Already have an account ? Klik <Button variant="link" onClick={handleLogin} className={klikHere}>Here</Button></p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
