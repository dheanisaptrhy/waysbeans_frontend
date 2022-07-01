import React from 'react'
import NavbarUser from '../components/navbar/NavbarUser'
import jumbotron from '../assets/Jumbotron.png'
import { useQuery } from 'react-query'
import { API } from '../config/api'
import pagecss from '../styles/Pages.module.css'
import { useNavigate } from 'react-router-dom'


export default function Home() {
  const { headingTitle, card } = pagecss
  const navigate = useNavigate()

  // fetch data
  let { data: products, refetch } = useQuery('productsCache', async () => {
    const response = await API.get('/products')
    return response.data.data
  })

  return (
    <div>
      <NavbarUser />
      <div className='mt-5'>
        <div className='d-flex justify-content-center'>
          <div>
            <div>
              <img src={jumbotron} />
            </div>

            <div>
              <div className='d-flex flex-wrap'>
                {products?.map((item, index) => (
                  <div className='my-3 me-3' key={index} onClick={() => navigate(`/detailpage/${item.id}`)}>
                    <div className={card}>
                      <img src={item.image} className="img-fluid img-rounded" />
                      <div className='px-3 py-2'>
                        <div className={headingTitle}>{item.title}</div>
                        <div>Rp. {item.price}</div>
                        <div>Stock : {item.qty}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
