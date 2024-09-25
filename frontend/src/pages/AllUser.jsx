import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEditOutline } from "react-icons/md";
import ChangeUsdrRole from '../components/ChangeUsdrRole';
const AllUser = () => {

    const [allUser, setAllUsers] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: ""

    })

    const fetchAllUsers = async () => {
        const fetchData = await fetch(SummaryApi.allUser.url, {
            method: SummaryApi.allUser.method,
            credentials: 'include'
        })

        const dataResponse = await fetchData.json()
        if (dataResponse.success) {
            setAllUsers(dataResponse.data)
        }
        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
    }

    useEffect(() => {
        fetchAllUsers();
    }, [])
    return (
        <div className='bg-white pb-4 '>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-black text-white h-10'>
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='pb-4 bg-white'>
                    {
                        allUser.map((e, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{e?.name}</td>
                                    <td>{e?.email}</td>
                                    <td>{e?.role}</td>
                                    <td>{moment(e?.createdAt).format('LL')}</td>
                                    <td>
                                        <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                                            onClick={() => {
                                                setUpdateUserDetails(e)
                                                setOpenUpdateRole(true)

                                            }}

                                        >
                                            <MdModeEditOutline />
                                        </button>
                                    </td>

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {
                openUpdateRole && (
                    <ChangeUsdrRole onClose={() => setOpenUpdateRole(false)}
                        name={updateUserDetails.name}
                        email={updateUserDetails.email}
                        role={updateUserDetails.role}
                        userId={updateUserDetails._id}
                        callFunc = {fetchAllUsers}
                    />
                )
            }

        </div>
    )
}

export default AllUser