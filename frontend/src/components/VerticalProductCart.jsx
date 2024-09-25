import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayINRCurrency from '../helpers/dispaltCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'

const VerticalProductCart = ({ loading, data = [] }) => {
    const loadingList = new Array(13).fill(null)
    const { fetchUserAddToCart } = useContext(Context)
    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }
    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] md:justify-between  justify-center md:gap-4 overflow-x-scroll scrollbar-none transition-all'>


            
            {
                loading ? (
                    loadingList.map((product, index) => {
                        return (
                            <div className='w-full min-w-[280px]  md:min-w-[300px] max-w-[280px] md:max-w-[310px]  bg-white rounded-sm shadow '>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>

                                </div>
                                <div className=' grid p-4 gap-3'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animation-pulse rounded-full bg-slate-200'></h2>
                                    <p className='capitalize text-slate-500 p-1 animation-pulse rounded-full bg-slate-200 py-2'></p>
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium p-1 animation-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                        <p className='text-slate-500 line-through p-1 animation-pulse rounded-full bg-slate-200 w-full py-2'></p>

                                    </div>
                                    <button className=' text-sm bg-slate-200 text-white px-3  rounded-full py-2 animate-pulse'></button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data.map((product, index) => {
                        return (
                            <Link to={"/product/" + product?._id} className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow' onClick={scrollTop}>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                    <img src={product?.productImage[0]} alt="" className='object-scale-down  h-full hover:scale-110 mix-blend-multiply' />
                                </div>
                                <div className=' grid p-4 gap-3'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>

                                    </div>
                                    <button className=' text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                                </div>
                            </Link>
                        )
                    })
                )

            }
        </div>
    )
}

export default VerticalProductCart
