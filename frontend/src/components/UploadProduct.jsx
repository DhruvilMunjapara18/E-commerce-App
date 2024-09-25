import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const UploadProduct = ({
    onClose,
    fetchData

}) => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: "",

    })
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [fullScreenImage, setFullaScreenImage] = useState("")

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]
        const uploadImageCloudinary = await uploadImage(file)

        setData((prev) => {
            return {
                ...prev,
                productImage: [...prev.productImage, uploadImageCloudinary.url]
            }
        })


    }
    const handleDeleteProductImage = async (index) => {
        console.log("image index", index);

        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)

        setData((prev) => {
            return {
                ...prev,
                productImage: [...newProductImage]
            }
        })


    }

    // upload product 

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(SummaryApi.uploadProduct.url, {
            method: SummaryApi.uploadProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const responseData = await response.json()

        if (responseData.success) {
            toast.success(responseData?.message)
            onClose()
            fetchData()       
        }

        if (responseData.error) {
            toast.error(responseData?.message)
        }


    }
    return (
        <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 bottom-0 top-0 left-0 right-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>
                        Upload Product
                    </h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer ' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>
                <form className='grid p-4  gap-3 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                    <label htmlFor="productName">Product Name:</label>
                    <input
                        type="text"
                        id='productName'
                        name='productName'
                        placeholder='enter product name'
                        value={data.productName}
                        className='p-2 bg-slate-100 border rounded'
                        onChange={handleOnChange}
                        required
                    />

                    <label htmlFor="brandName">Brand Name:</label>
                    <input
                        type="text"
                        id='brandName'
                        placeholder='enter brand name'
                        value={data.brandName}
                        name='brandName'
                        className='p-2 bg-slate-100 border rounded'
                        onChange={handleOnChange}
                        required
                    />

                    <label htmlFor="category">Category:</label>
                    <select
                        name="category"
                        id=""
                        value={data.category}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    >

                        <option value={""}>Select Category</option>

                        {
                            productCategory.map((e, index) => {
                                return (
                                    <option value={e.value} key={e.value + index}>{e.label}</option>
                                )
                            }
                            )
                        }

                    </select>
                    <label htmlFor="producctImage">Product Image:</label>
                    <label htmlFor="uploadImageInput">
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center'>

                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
                            </div>

                        </div>
                    </label>
                    <div>
                        {
                            data?.productImage[0] ? (
                                <div className='flex items-center gap-2 '>
                                    {
                                        data.productImage.map((e, index) => {
                                            return (
                                                <div className='relative group'>
                                                    <img src={e}
                                                        alt={e} width={80}
                                                        height={80}
                                                        className='bg-slate-100 cursor-pointer'
                                                        onClick={() => {
                                                            setOpenFullScreenImage(true)
                                                            setFullaScreenImage(e)
                                                        }} />
                                                    <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                                                        <MdDelete />
                                                    </div>
                                                </div>

                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <p className='text-red-600 text-xs'>*Please upload product image</p>
                            )
                        }

                    </div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id='price'
                        placeholder='enter price name'
                        value={data.price}
                        name='price'
                        className='p-2 bg-slate-100 border rounded'
                        onChange={handleOnChange}
                        required
                    />

                    <label htmlFor="sellingPrice">Selling Price:</label>
                    <input
                        type="number"
                        id='sellingPrice'
                        placeholder='enter selling price name'
                        value={data.sellingPrice}
                        name='sellingPrice'
                        className='p-2 bg-slate-100 border rounded'
                        onChange={handleOnChange}
                        required
                    />

                    <label htmlFor="description">Description:</label>
                    <textarea
                        name="description"
                        className='h-28 bg-slate-100  border resize-none p-1'
                        placeholder='enter product description'
                        rows={3}
                        onChange={handleOnChange}
                        value={data.description}
                        required
                    >

                    </textarea>


                    <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Upload Product</button>
                </form>

            </div>

            {/* display image  */}
            {
                openFullScreenImage && (
                    <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
                )
            }

        </div>
    )
}

export default UploadProduct;