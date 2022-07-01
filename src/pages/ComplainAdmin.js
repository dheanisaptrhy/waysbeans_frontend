import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Chat from '../components/complain/Chat'
import Contact from '../components/complain/Contact'
import NavbarUser from '../components/navbar/NavbarUser'
import { UserContext } from '../context/UserContext'
import { io } from 'socket.io-client'
import NavbarAdmin from '../components/navbar/NavbarAdmin'
let socket


export default function ComplainAdmin() {
    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    const [messages, setMessages] = useState([])
    const [state] = useContext(UserContext)

    const loadContacts = () => {
        // kirim perintah ke config socket
        socket.emit('load customer contacts')
        // terima perintah dari socket
        socket.on('customer contacts', (data) => {
            let dataContacts = data.map((item) => ({
                ...item,
                message: messages.length > 0 ? messages[messages.length - 1].message : "Click here to start message"
            }))
            setContacts(dataContacts)
            console.log(dataContacts);
        })
    }
    useEffect(() => {
        socket = io('http://localhost:3500/', {
            auth: {
                token: localStorage.getItem('token')
            },
            query: {
                id: state.user.id
            }
        })
        socket.on('new message', () => {
            console.log('contact', contact);
            socket.emit('load messages', contact?.id)
        })
        loadContacts()
        loadMessages()

        socket.on('connect_error', (err) => {
            console.log(err.message); // not authorized
        })

        return () => {
            // unmount
            socket.disconnect()
        }
    }, [messages])


    const onClickContact = (data) => {
        setContact(data)
        socket.emit('load messages', data.id)
    }

    const loadMessages = () => {
        socket.on('messages', (data) => {
            if (data.length > 0) {
                const dataMessages = data.map((item) => ({
                    idSender: item.sender.id,
                    message: item.message
                }))
                setMessages(dataMessages)
            }
            loadContacts()

        })
    }

    const onSendMessage = (e) => {
        if (e.key === "Enter") {
            const data = {
                idRecipient: contact.id,
                message: e.target.value
            }
            socket.emit('send message', data)
            e.target.value=""
        }
    }
    return (
        <div>
            <NavbarAdmin />
            <Container className='mt-5'  style={{ height: '89.5vh' }}>
                <Row>
                    <Col md={3}>
                        <Contact dataContact={contacts} clickContact={onClickContact} contact={contact} />
                    </Col>
                    <Col md={9}>
                        <Chat contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
