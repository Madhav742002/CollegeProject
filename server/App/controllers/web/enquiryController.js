const enquiryModel = require('../../models/enquiry.model');

let enquiryInsert=(req,res)=>

{
    let{name,email,phone,message}=req.body;
    let enquiry=new enquiryModel({
        name,
        email,
        phone,
        message
    });
    enquiry.save().then(()=>{
        res.send({status:1, message:"Enquire saved successfully."});

    }).catch((err)=>{
        res.send({status:0, message:"Error saving enquiry.",error:err});
        })
}
let enquiryList=async(req,res)=>{
   let enquiry=await enquiryModel.find();
   res.send({status:1, enquiryList:enquiry});
}
let enquiryDelete=async(req,res)=>{
    let enId=req.params.id;
    let enquiry=await enquiryModel.deleteOne({_id:enId});
    res.send({status:1, message:"Enquiry deleted successfully.",enquiry});
}
module.exports={enquiryInsert,enquiryList,enquiryDelete};