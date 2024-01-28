const asynchandler = require("express-async-handler")
const Contact = require("../models/contactModels")
//@desc GET all contacts
//@route GET /api/contacts
//@access public

const getContacts = asynchandler( async (req,res)=>{
    const contacts = await  Contact.find()
    res.status(200).json(contacts)
})

//@route POST /api/contacts
const createContact =asynchandler( async  (req,res)=>{
    console.log("the request body is : ",req.body)
    const {name,email,phone} = req.body
    if(!name || !email ||!phone){
        res.status(400)
        throw new Error(" all fields are mandotory!.....")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
    })
    res.status(200).json(contact)
})

//@route GET /api/contacts/:id
const getContact =asynchandler( async  (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("contact not found....")
    }
    res.status(200).json(contact)
})
//@route PUT /api/contacts/:id
const updateContact =asynchandler( async  (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("contact not found....")
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updateContact)
})

//@route DELETE /api/contacts/:id
const deleteContact = asynchandler( async  (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("contact not found....")
    }
    await Contact.deleteOne()
    // await Contact.deleteMany()
    res.status(200).json(contact)
})


module.exports = {getContacts, createContact, getContact, updateContact, deleteContact}