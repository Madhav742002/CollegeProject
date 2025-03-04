import React, { useEffect, useState } from "react"
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { ToastContainer, toast } from 'react-toastify';
import {EnquiryList} from './enquiry/EnquiryList';
import axios from "axios";
export default function Enquiry(){
    let [enquiryList, setEnquiryList] = useState([])
     let [formData,setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
     })

     let saveEnquiry = (e) => {
        e.preventDefault()
        // let formData={
        //     name: e.target.name.value,
        //     email: e.target.email.value,
        //     phone: e.target.phone.value,
        //     message: e.target.message.value
        // }
        axios.post('http://localhost:8020/api/web/enquiry/insert',formData)
        .then((res) => {
            console.log(res.data);
            toast.success('Enquiry submitted successfully')
              setFormData({
                name: "",
                email: "",
                phone: "",
                message: ""
              })
        })
    }
   
    let getAllenquiry = () => {
        axios.get('http://localhost:8020/api/web/enquiry/view', formData)
         .then((res) => {
           return res.data
       })
        .then((finalData) => {
            if(finalData.status){
            setEnquiryList(finalData.enquiryList)
            }
        })    
    } 
   


    let getValue = (e) => {
        let inputName = e.target.name
        let inputValue = e.target.value
        let oldData={...formData}
        

        oldData[inputName] = inputValue;
        setFormData(oldData)
        // {
        //     name: "",
        //     email: "",
        //     phone: "",
        //     message: ""
        // }
    }
    useEffect(() => {
        getAllenquiry()
    }),[]
    return (
        <div>
            <ToastContainer />
            <h1 className="text-[40px] text-center py-6 font-bold">User Enquiry</h1>

            <div className="grid md:grid-cols-[30%_auto] m-3 gap-10">
                <div className="bg-gray-200 p-4">
                    <h2 className="text-[20px] font-bold">User Enquiry</h2>
                    <form action="" onSubmit={saveEnquiry}>
                        <div className="py-3">
                            <Label htmlFor="name" value="Your nmae" />
                            <TextInput type="text" value={formData.name} onChange={getValue} name="name" placeholder="Enter your Name" required />
                        </div>
                        <div className="py-3">
                            <Label htmlFor="Email" value="Your Email" />
                            <TextInput type="Email" value={formData.email} getValue onChange={getValue} name="email" placeholder="Enter your Email" required />
                        </div>

                        <div className="py-3">
                            <Label htmlFor="phone" value="Your phone" />
                            <TextInput type="text" value={formData.phone} onChange={getValue} name="phone" placeholder="Enter your phone" required />
                        </div>
                        <div className="py-3">
                            <Label htmlFor="message" value="Your Message" />
                            <Textarea name="message" value={formData.message} onChange={getValue} placeholder="Leave a comment..." required rows={4} />
                        </div>
                        <div className="py-3">
                            <Button type="submit" className="w-[100%]">save</Button>
                        </div>
                    </form>
                </div>
              <EnquiryList data={enquiryList}/>
            </div>
        </div>
    )
}



