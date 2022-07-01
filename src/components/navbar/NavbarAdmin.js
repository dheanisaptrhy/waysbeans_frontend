import React, { useContext, useRef, useState } from 'react'
import { Col, Overlay, Popover, Row } from 'react-bootstrap'
import logo from '../../assets/Icon.png'
import photo from '../../assets/blankprofile.jpg'
import kopi from '../../assets/kopi.png'
import chat from '../../assets/chat.png'
import bill from '../../assets/bill.png'
import loginout from '../../assets/logout.png'
import authCss from '../../styles/Auth.module.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { useQuery } from 'react-query'
import { API } from '../../config/api'


function NavbarAdmin() {
    const { buttonBorderless, btnLogo, btnPop } = authCss
    const ref = useRef(null)
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [target, setTarget] = useState(null)
    const [state, dispatch] = useContext(UserContext)

    let { data: profile, refetch: profileRefetch } = useQuery('userCache', async ()=>{
        const response = await API.get(`/profile`)
        // console.log(response.data.data);
        return response.data.data
    })

    const handleClick = (e) => {
        setShow(!show)
        setTarget(e.target)
    }

    const logout = () => {
        dispatch({
            type: "LOGOUT",
        })
        profileRefetch()
        navigate('/')
    }
    return (
        <div style={{ boxShadow: "0px 5px 10px gray" }}>
            <div style={{ margin: '0 50px', padding: "10px 0" }}>
                <Row>
                    <Col xs={1} className='d-flex align-items-center'>
                        <div>
                            <button className={buttonBorderless} onClick={() => navigate('/homeadmin')}>
                                <img src={logo} />
                            </button>
                        </div>
                    </Col>
                    <Col xs={5}></Col>
                    <Col xs={6} className='d-flex justify-content-end'>
                        <div className='d-flex justify-content-center align-items-center'>
                            <div ref={ref}>
                                <button className={`ms-3 ${buttonBorderless}`} onClick={handleClick}>
                                    <img src={profile?.image ? profile.image : photo} className="img-fluid rounded-circle" style={{
                                        width: '4rem', height: '4rem', border: 'none'
                                    }} />
                                </button>

                                <Overlay
                                    show={show}
                                    target={target}
                                    placement="bottom"
                                    container={ref}
                                    containerPadding={20}
                                >
                                    <Popover id="popover-contained">
                                        <Popover.Content>
                                            <button className={btnPop} onClick={() => navigate('/addproduct')}>
                                                <img src={kopi} className={btnLogo} />
                                                Add Product
                                            </button>

                                            <hr style={{
                                                border: "1px solid #613D2B80"
                                            }} />

                                            <button className={btnPop} onClick={() => navigate('/homeadmin')}>
                                                <img src={kopi} className={btnLogo} />
                                                List Product
                                            </button>

                                            <hr style={{
                                                border: "1px solid #613D2B80"
                                            }} />

                                            <button className={btnPop} onClick={() => navigate('/transactionadmin')}>
                                                <img src={bill} className={btnLogo} />
                                                Incoming Transaction
                                            </button>

                                            <hr style={{
                                                border: "1px solid #613D2B80"
                                            }} />

                                            <button className={btnPop} onClick={() => navigate('/complainadmin')}>
                                                <img src={chat} className={btnLogo} />
                                                Complain
                                            </button>

                                            <hr style={{
                                                border: "1px solid #613D2B80"
                                            }} />

                                            <button className={btnPop} onClick={logout}>
                                                <img src={loginout} className={btnLogo} />
                                                Logout
                                            </button>
                                        </Popover.Content>
                                    </Popover>
                                </Overlay>
                            </div>
                        </div>
                    </Col>
                </Row>


            </div>
        </div>
    )
}

export default NavbarAdmin