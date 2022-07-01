import React from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import NavbarAdmin from '../components/navbar/NavbarAdmin'
import { useNavigate } from 'react-router-dom'
import beans from '../data/beans'
import pagecss from '../styles/Pages.module.css'
// import transaction from '../data/transaction'
import check from '../assets/check.png'
import cancel from '../assets/cancel.png'
import { useMutation, useQuery } from 'react-query'
import { API } from '../config/api'

function TransactionAdmin() {
    const { btnActionAdd, btnActionDelete, btnActionEdit
        , textYellow, textRed, textGreen, textBlue } = pagecss

    let { data: transactions, refetch: transactionRefetch } = useQuery('transactionsadmin', async () => {
        const response = await API.get('/transactionsadmin')
        return response.data.data
    })

    let { data: profile, refetch: profileRefetch } = useQuery('profileCache', async () => {
        const response = await API.get(`/profile/${transactions[0].idBuyer}`)
        return response.data.data
    })

    const navigate = useNavigate()
    const cancelItem = useMutation(async (id) => {
        try {
            // e.preventDefault()
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }
            // const datat = null

            const response = await API.patch(`/transactioncancel/${id}`, config)
            console.log(id);
            transactionRefetch()
        } catch (error) {
            console.log(error);
        }
    })

    const handleCancel = () => {
        cancelItem.mutate()
    }
    const handleApprove = () => {

    }
    return (
        <div>
            <div>
                <NavbarAdmin />
            </div>
            <Container className='mt-5'>
                <h4 style={{
                    color: "#613D2B",
                    fontWeight: "700"
                }}>Income Transaction</h4>

                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Post Code</th>
                            <th>Products Order</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions?.map((data, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{data.buyer?.name}</td>
                                <td>{profile?.address}</td>
                                <td>{profile?.postCode}</td>
                                <td>{data.products?.title}</td>
                                <td className={`${textYellow} ${data.status === 'success' ? textGreen : textBlue}`}>{data.status}</td>
                                <td>
                                    {data.status === "Waiting Approve" ? (
                                        <div>
                                            <button className={`me-2 ${btnActionDelete}`}
                                                onClick={(e) => handleCancel.mutate(e, data.id)}>Cancel</button>
                                            <button className={btnActionEdit} onClick={() => handleApprove(data.id)}>Approve</button>
                                        </div>
                                    ) : (
                                        <div className='d-flex justify-content-center'>
                                            <img src={data.status === "Success" ? check : cancel} />
                                        </div>
                                    )}


                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default TransactionAdmin