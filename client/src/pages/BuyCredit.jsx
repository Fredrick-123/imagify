import React, { useContext } from 'react'
import {assets, plans} from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";

const BuyCredit = () => {

  const {user, setShowLogin, backendURL, loadCreditData, token} = useContext(AppContext);
  const navigate = useNavigate();

  const initPayment = async (order)=>{
    const options = {
      key : import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount : order.amount,
      currency : order.currency,
      name : 'Credits Payment',
      description : 'payment is for purchasing the credits',
      order_id: order.id,
      receipt: order.receipt,
      handler: async(response)=>{
        try {
          
          const {data} = await axios.post(backendURL + '/api/user/verify-payment', response, {headers: {token}})
          if(data.success){
            loadCreditData();
            navigate('/');
            toast.success(data.message)
          }

        } catch (error) {
          toast.error(error.message);
        }
      }
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  
  }

  const paymentRazorpay = async (planId)=>{
    try {
      if(!user){
        setShowLogin(true)
      }

      const {data} = await  axios.post(backendURL + '/api/user/payment', {planId}, {
        headers : {token}
      })
      
      if(data.success){
        initPayment(data.order);
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the plan</h1>

      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((plan,index)=>(
          <div className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500' key={index} >
            <img width={40} src={assets.lock_icon} alt="" />
            <p className='mt-3 mb-1 font-semibold'>{plan.id}</p>
            <p className='text-sm'>{plan.desc}</p>
            <p className='mt-6'> <span className='text-3xl font-medium'>₹{plan.price} </span> / {plan.credits} credits</p>
            <button onClick={()=>paymentRazorpay(plan.id)} className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'>
              {user ? 'Purchase' : 'Get Started'}
            </button>
            {!user && 
            <p onClick={()=>setShowLogin(true)} className='mt-5 text-center'>Don't have an account <span className='text-blue-600 cursor-pointer'>Sign Up</span></p>
            }
          </div>
        ))}
      </div>

    </div>
  )
}

export default BuyCredit;