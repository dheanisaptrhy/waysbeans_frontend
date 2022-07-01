import React, { useContext, useRef, useState } from 'react'
import { Col, Overlay, Popover, Row } from 'react-bootstrap'
import logo from '../../assets/Icon.png'
import photo from '../../assets/blankprofile.jpg'
import basket from '../../assets/basket.png'
import user from '../../assets/user.png'
import chat from '../../assets/chat.png'
import loginout from '../../assets/logout.png'
import authCss from '../../styles/Auth.module.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { useQuery } from 'react-query'
import { API } from '../../config/api'
import { CartContext } from '../../context/CartContext'


export default function NavbarUser() {
    const { buttonBorderless, btnLogo, btnPop } = authCss
    const ref = useRef(null)
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [target, setTarget] = useState(null)
    const [state, dispatch] = useContext(UserContext)
    const [cartState, cartDispatch] = useContext(CartContext)

    let { data: profile, refetch: profileRefetch } = useQuery('userCache', async () => {
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
                            <button className={buttonBorderless} onClick={() => navigate('/home')}>
                                <img src={logo} />
                            </button>
                        </div>
                    </Col>
                    <Col xs={5}></Col>
                    <Col xs={6} className='d-flex justify-content-end'>
                        <div className='d-flex justify-content-center align-items-center' ref={ref}>
                            <>
                                <div className='d-flex'>
                                    <button className={buttonBorderless} onClick={() => navigate('/cart')}>
                                        <img src={basket} className="img-fluid" style={{
                                            maxWidth: '3rem', border: 'none'
                                        }} />
                                    </button>
                                    {cartState.cartItems.length !== 0 && (
                                    <div style={{
                                        backgroundColor: '#FF0742',
                                        width: "1.5rem",
                                        height: "1.3rem",
                                        color: "white",
                                        fontWeight:"700",
                                        fontSize:"14px",
                                        marginLeft:"-20px",
                                        paddingLeft:"7px",
                                        borderRadius:"5px"
                                    }}>{cartState.cartItems.length}</div>
                                    )}
                                </div>

                                <button className={`ms-3 d-flex ${buttonBorderless}`} onClick={handleClick}>
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
                                            <button className={btnPop} onClick={() => navigate(`/profile/${state.user.id}`)}>
                                                <img src={user} className={btnLogo} />
                                                Profile
                                            </button>

                                            <hr style={{
                                                border: "1px solid #613D2B80"
                                            }} />

                                            <button className={btnPop} onClick={() => navigate('/complain')}>
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
                            </>
                        </div>
                    </Col>
                </Row>


            </div>
        </div>
    )
}
