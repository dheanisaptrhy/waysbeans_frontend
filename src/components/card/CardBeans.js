import React from 'react'
import { Link } from 'react-router-dom'
import pagecss from '../../styles/Pages.module.css'
import convertRupiah from "rupiah-format";


export default function CardBeans({ item, index }) {
    const { headingTitle, card } = pagecss

    return (
        <Link to={`/detailpage/${item.id}`}
            style={{ textDecoration: "none" }}
            key={index}>

            <div className='my-3 me-3'>
                <div className={card}>
                    <img src={item.image} className="img-fluid img-rounded" />
                    <div className='px-3 py-2'>
                        <div className={headingTitle}>{item.title}</div>
                        <div>{convertRupiah.convert(item.price)}</div>
                        <div>Stock : {item.qty}</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
