import React from 'react'
import photo from '../../assets/blankprofile.jpg'
import pagecss from '../../styles/Pages.module.css'
import send from '../../assets/kirim.png'

export default function Chat({ contact, user, messages, sendMessage }) {
    const { chatBoxSeller, chatBoxBuyer, inputMessage } = pagecss
    return (
        <>
            {contact ? (
                <div style={{
                    height: "79.5vh",
                    backgroundColor: "#DFDFDF",
                    borderRadius: "5px"
                }}>
                    <div className='d-flex p-2' style={{
                        backgroundColor: "#C4C4C4",
                        borderRadius: "5px"
                    }}>
                        <img src={contact.profile?.image || photo} className='rounded-circle me-3'
                            style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover"
                            }} />
                        <div>
                            <div>{contact.name}</div>
                            <div>Online</div>
                        </div>

                    </div>
                    <div style={{ height: '60.5vh', }} className='overflow-auto px-3 py-2'>
                        {messages.map((item, index) => (
                            <div key={index}>
                                <div className={`d-flex py-1 ${item.idSender === user.id ? 'justify-content-end' : 'justify-content-start'}`}>
                                    {/* {item.idSender !== user.id && (
                                        <img src={contact.profile?.image || photo} className='rounded-circle' style={{
                                            width: "50px", height: "50px", objectFit: "cover"
                                        }} />
                                    )} */}
                                    {/* <div style={{color:"white"}}>meong</div> */}
                                    <div className={item.idSender === user.id ? chatBoxSeller : chatBoxBuyer}>
                                        {item.message}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ height: '6vh' }} className='px-3 mt-3 d-flex'>
                        <input
                            placeholder='Write your message here ...'
                            className={`me-2 ${inputMessage}`}
                            onKeyPress={sendMessage} />
                        <button onClick={sendMessage}
                            style={{
                                width: "10%",
                                border: "none", backgroundColor: "#8AD0D0", borderRadius: "5px"
                            }}>
                            <img src={send} style={{ width: "20px" }} />
                        </button>
                    </div>
                </div>
            ) : (
                <div style={{ height: '89.5vh' }}
                    className='h4 d-flex justify-content-center align-items-center'>
                    No Message
                </div>)}
        </>
    )
}
