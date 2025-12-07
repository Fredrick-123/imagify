import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Result = () => {

  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const {backendURL, token, loadCreditData,credit} = useContext(AppContext)
  

  const generateImage = async (prompt)=>{
          try {
              const {data} = await axios.post(backendURL + '/api/image/generate', {prompt}, {headers : {token}})
  
              if(data.success){
                  loadCreditData();
                  return data.resultImage;
              }
              else{
                  toast.error(data.message)
                  loadCreditData();
                  if(credit === 0){
                      navigate('/buycredit');
                  }
              }
          } catch (error) {
              toast.error(error.message)
          }
      }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (input) {
      const image = await generateImage(input);
      if (image) {
        setImageLoaded(true);
        setImage(image)
      }
    }
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col min-h-[90h] justify-center items-center'>
      <div>
        <div className='relative '>
          <img className='max-w-sm rounded' src={image} alt="your image will show here" />
          <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`} />
        </div>
        <p className={!loading ? 'hidden' : ''}>Loading.....</p>
      </div>

      {!isImageLoaded &&
        <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
          <input onChange={e => setInput(e.target.value)} value={input} type="text" placeholder='Descride what you want to generate' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20' />
          <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full text-white'>Generate</button>
        </div>
      }

      {isImageLoaded &&
        <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
          <p onClick={() => { setImageLoaded(false) }} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
          <a download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer' href={image}>Downlaod</a>
        </div>}
    </form >
  )
}

export default Result