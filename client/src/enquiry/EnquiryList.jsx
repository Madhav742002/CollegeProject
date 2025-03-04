import React from "react"
import { Table, TableCell} from "flowbite-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
export function EnquiryList({ data }) {
    let deleteRow=(delid)=>{
        axios.delete('http://localhost:8020/api/web/enquiry/delete/'+delid)
        .then((res)=>{

            toast.success('Enquiry Deleted Success', res)
        })
    }
    return (
        <div className="bg-gray-200 p-4">
            <ToastContainer/>
            <h3 className="text-[20px] font-bold mb-4">Enquiry List</h3>
            <div className="overflow-x-auto">
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Sr No</Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>phone</Table.HeadCell>
                        <Table.HeadCell>Message</Table.HeadCell>
                        <Table.HeadCell>
                            Delete
                            </Table.HeadCell>
                        <Table.HeadCell>
                            Edit
                            </Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y">
                            {
                                data.length>= 1 ?
                                data.map((item,index) => {
                                   return(
                                     <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                         <TableCell>{index+1}</TableCell>
                                         <TableCell>{item.name}</TableCell>
                                         <TableCell>{item.email}</TableCell>
                                         <TableCell>{item.phone}</TableCell>
                                         <TableCell>{item.message}</TableCell>
                                         <TableCell>
                                             <button onClick={()=>deleteRow(item._id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
                                         </TableCell>
                                         <TableCell>
                                             <button className="bg-red-500 text-white px-4 py-2 rounded-md">Edit</button>
                                         </TableCell>
                                     </Table.Row>
                                   )
                                })
                                :
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell colSpan={7} className="text-center">No Data found</Table.Cell>
                            </Table.Row>
                            }
                        </Table.Body>
                </Table>
            </div>
        </div>
    )
}
