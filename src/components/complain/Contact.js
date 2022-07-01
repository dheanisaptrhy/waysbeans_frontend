import photo from '../../assets/blankprofile.jpg'
import React from 'react'
import pagecss from '../../styles/Pages.module.css'

export default function Contact({ dataContact, clickContact, contact }) {
    const {contactName, text} = pagecss
    console.log(contact);
    return (
        <>
            {dataContact?.length > 0 && (
                <>
                    {dataContact?.map((item) => (
                        <div key={item.id}
                            className={`d-flex p-3 align-items-center ${contact?.id == item?.id}`}
                            onClick={() => {
                                clickContact(item)
                            }}
                            
                            style={{
                                backgroundColor:"#DFDFDF",
                                borderRadius:"5px"
                            }}>
                            <img src={item.profile?.image || photo} className='rounded-circle'
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    objectFit: "cover"
                                }} />
                            <div>
                                <div className={`ms-3 ${contactName}`}>{item.name}</div>
                                {/* <ul>
                                    <li className={contactName}>{item.name}</li>
                                    <li className={text}>{item.message}</li>
                                </ul> */}
                            </div>

                        </div>
                    ))}
                </>
            )}
        </>
    )
}
