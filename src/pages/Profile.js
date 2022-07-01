import React, { useContext } from 'react'
import NavbarUser from '../components/navbar/NavbarUser'
import pagecss from '../styles/Pages.module.css'
import { Row, Col, Container } from 'react-bootstrap'
import photo from '../assets/blankprofile.jpg'
import ima from '../assets/kopibiru.png'
import logo from '../assets/Icon.png'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { API } from '../config/api'
import { UserContext } from '../context/UserContext'
import convertRupiah from "rupiah-format";

export default function Profile() {
    const { headingTitle, textBrown, miniPict, button } = pagecss

    const navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext)
    let { data: profile, refetch: profileRefetch } = useQuery('userCache', async () => {
        const response = await API.get(`/profile/${state.user.id}`)
        console.log(response.data.data);
        return response.data.data
    })

    let { data: transaction, refetch: transactionRf } = useQuery('transactionclient', async () => {
        const response = await API.get(`/transactionsclient`)
        return response.data.data
    })
    return (
        <div>
            <div>
                <NavbarUser />
            </div>
            <Container className='mt-5'>
                <Row>
                    <Col xs={6}>
                        <h4 className={headingTitle}>My Profile</h4>
                        <Row className='mt-3'>
                            <Col>
                                <div>
                                    <img src={profile?.image ? profile.image : photo} style={{ width: "18rem", height: '23rem' }} />
                                    <button className={button} style={{ width: "18rem", marginTop: '10px' }}
                                        onClick={() => navigate(`/editprofile/${state.user.id}`)}>
                                        Edit Profile
                                    </button>
                                </div>
                            </Col>
                            <Col>
                                <h6 className={headingTitle}>Full Name</h6>
                                <p className='mb-4'>{profile?.user?.name}</p>

                                <h6 className={headingTitle}>Email</h6>
                                <p className='mb-4'>{profile?.user?.email}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={6}>
                        <h4 className={headingTitle}>Product</h4>
                        {transaction?.length !== 0 && (
                            <>
                                {transaction?.map((item, index) => (
                                    <Row style={{
                                        backgroundColor: "#F6E6DA",
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center"
                                    }} className='mt-3 p-2'
                                    key={index.id}>
                                        <Col xs={9} className='d-flex'>
                                            <img src={item?.products?.image} className={miniPict} />
                                            <div className='d-flex align-items-center'>
                                                <div>
                                                    <h5 className={headingTitle}>{item?.products?.title}</h5>
                                                    <div className={textBrown}>{item?.createdAt}</div>
                                                    <div className={textBrown}>Price: {convertRupiah.convert(item?.products?.price)}</div>
                                                    <div className={textBrown}>Qty: {item?.qty}</div>
                                                    <h6 className={textBrown}>Sub Total : {convertRupiah.convert(item?.price)}</h6>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xs={3}>
                                            <img src={logo} style={{
                                                width: "7rem"
                                            }} />
                                            <img src={logo} style={{
                                                width: "7rem"
                                            }} />
                                            <div>{item?.status}</div>
                                        </Col>

                                    </Row>
                                ))}
                            </>

                        )}

                    </Col>
                </Row>

            </Container>
        </div >
    )
}
