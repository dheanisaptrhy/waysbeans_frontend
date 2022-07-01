import React, { useContext, useEffect, useState } from 'react'
import NavbarUser from '../components/navbar/NavbarUser'
import { Container } from 'react-bootstrap'
import pagecss from '../styles/Pages.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useMutation, useQuery } from 'react-query'
import { API } from '../config/api'

export default function UpdateProfile() {
    const { input, button, btnActionUpload } = pagecss

    const { id } = useParams()
    const navigate = useNavigate()
    const [preview, setPreview] = useState(null)
    const [state, dispatch] = useContext(UserContext)

    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        postCode: "",
        image: ""
    })

    let { data: profile, refetch } = useQuery('userCache', async () => {
        const response = await API.get(`/profile/${state.user.id}`)
        return response.data.data
    })

    useEffect(()=>{
        if(profile){
            setPreview(profile.image)
            setForm({
                ...form,
                name: profile.user.name,
                email: profile.user.email,
                address: profile.address,
                postCode: profile.postCode,
                image: profile.image,
            })
        }
    }, [profile])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === 'file' ? e.target.files : e.target.value,
        })
        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0])
            setPreview(url)
        }
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const formData = new FormData();
            if (form.image) {
                formData.set('image',  form?.image[0], form?.image[0]?.name)
            }
            formData.set('name', form.name)
            formData.set('email', form.email)
            formData.set('address', form.address)
            formData.set('postCode', form.postCode)

            const config = {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }

            const response = await API.patch(`/profile`, formData, config)
            console.log(response.data.data);
            navigate(`/profile/${state.user.id}`)
        } catch (error) {
            console.log(error);
        }
    })

    return (
        <div>
            <div>
                <NavbarUser />
            </div>
            <Container className='d-flex justify-content-center align-items-center'
            >
                <div style={{ width: "50%" }}>
                    <form className='mt-5 ' onSubmit={(e)=>handleSubmit.mutate(e)}>
                        <div className='d-flex justify-content-center align-items-center'>
                            <div>
                                <div className='d-flex justify-content-center'>
                                    {preview ? (
                                        <img
                                            src={preview}
                                            style={{
                                                maxWidth: '13rem',
                                                maxHeight: '13rem',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    ) : (
                                        <img
                                            src={form.image}
                                            style={{
                                                maxWidth: '13rem',
                                                maxHeight: '13rem',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    )}
                                </div>

                                <div className='d-flex justify-content-center '>
                                    <label for="image" className={button} style={{ width: '100%', padding: "5px" }}>
                                        Change Photo Profile
                                    </label>
                                </div>
                            </div>
                        </div>
                        <input
                            type="file"
                            id="image"
                            placeholder="Upload Image"
                            name="image"
                            onChange={handleChange}
                            hidden />

                        <input className={input}
                            type="text"
                            placeholder="Full Name"
                            name="name"
                            onChange={handleChange}
                            value={form?.name} />

                        <input className={input}
                            type="text"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={form?.email}/>

                        <input className={input}
                            type="text"
                            placeholder="Address"
                            name="address"
                            onChange={handleChange}
                            value={form?.address} />

                        <input className={input}
                            type="text"
                            placeholder="Postal Code"
                            name="postCode"
                            onChange={handleChange}
                            value={form?.postCode} />

                        <button className={button}
                            style={{ marginTop: '20px', width: "100%" }}
                            type='submit'
                        >
                            Save
                        </button>
                    </form>
                </div>
            </Container>
        </div>
    )
}
