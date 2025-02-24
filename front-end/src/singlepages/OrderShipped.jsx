import React from 'react'
import { Link } from 'react-router-dom'

export default function OrderShipped() {
  return (
    <div className=' mt-5'style={{height:'70vh', backgroundImage:'url(https://img.freepik.com/free-vector/delivery-boy-picks-up-parcel-from-online-store-sending-customer-with-location-application-by-motorcycle-vector-illustration_1150-56229.jpg?uid=R182639791&ga=GA1.1.897827715.1735997478&semt=ais_hybrid)',
    backgroundSize:'contain', backgroundPosition:'center', backgroundRepeat:'no-repeat'
     }}>
        <div className="shipping d-flex  flex-column m-" style={{display:'inline',marginTop:'30px'}} >
            <div className="text" style={{padding:'15px'}}>
            <h1 className='fw-bold  text-success'>Your Order is on the Way!</h1>
            <p className='fw-bold fs-5 '>🚚 Expected delivery time: 1-2 hours.</p>
            <p className='fw-bold fs-5 '>😊 Hope you enjoy it.</p>
            </div>
                <Link to='/shop'>
            <button className='btn btn-primary ms-4 fw-bold'>Back To Shop</button>
                </Link>
        </div>
    </div>
  )
}
