import React from 'react'
import { Card } from 'react-bootstrap'
import jumbotron from '../assets/Jumbotron.png'
import beans from '../data/beans'
import CardBeans from './card/CardBeans'

export default function ListBeans() {
    return (
        <div className='d-flex justify-content-center'>
            <div>
                <div>
                    <img src={jumbotron} />
                </div>

                <div>
                    <div className='d-flex'>
                        {beans.map((item, index) => (
                            <CardBeans item={item} key={index}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
