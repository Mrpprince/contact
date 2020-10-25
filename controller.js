const Contact = require('./Contact');
const e = require('express');

exports.getAllContact = (req, res) => {
    Contact.find({})
        .then(contacts => {
            res.render('index', {contacts,error:{}})
        })
        .catch(error => {
            res.json({
                message: "error occurred"
            })
        })
};
exports.getSingleContact = (req, res) => {
    let { id } = req.params;
    Contact.findById(id)
        .then(contact => {
            res.json(contact)
        })
        .catch(error => {
            res.json({
                message: "error occurred"
            })
        })
};
exports.createContact = (req, res) => {
    let { name, email, phone, id } = req.body
    console.log(req.body);
    let error = {}
    if (!name) {
        error.name = "please provide your name"
    }
    if (!phone) {
        error.phone = "please provide your phone number"
    }
    if (!email) {
        error.email = "please provide an email "
    }
    let isError=Object.keys(error).length>0;
    console.log(isError,error)
    if(isError)
    {
        Contact.find({})
        .then(contacts=>{
           return res.render('index',{contacts,error})
        })
        .catch(e => {
            console.log(e);
          return  res.json({
                message: "error occurred"
            })
        })
    }
  
        if(id){
             Contact.findOneAndUpdate({_id:id},{
                 $set:{name,phone,email},
                 
             },{new:true})

             .then(c=>{
                 Contact.find({})
                 .then(contacts=>{
                     res.render('index',{contacts,error:{}})
                 })
             })
             .catch(e => {
                console.log(e);
               return res.json({
                    message: "error occurred"
                })
            })
        }
        else{
            let contact = new Contact({
                name,
                email,
                phone
            })
            contact.save()
                .then(c => {
                  Contact.find({})
                  .then(contacts=>{
                      return res.render('index',{contacts,error:{}})
                  })
                })
                .catch(e => {
                    console.log(e);
                   return res.json({
                        message: "error occurred"
                    })
                })
        }
};
exports.updateContact = (req, res) => {
    let { name, email, phone } = req.body;
    let { id } = req.params;
    Contact.findByIdAndUpdate({ _id: id }, {
        $set: {
            name, email, phone
        }
    },
        { new: true })
        .then(c => {
            res.json(c)
        })
        .catch(e => {
            console.log(e);
            res.json({
                message: "error occurred"
            })
        })

};
exports.deleteContact = (req, res) => {
    let { id } = req.params;
    Contact.findOneAndDelete({ _id: id })
        .then(()=> {
           Contact.find({})
           .then(contacts=>{
               res.render('index',{contacts,error:{}})
           })
        })
        .catch(e => {
            console.log(e);
            res.json({
                message: "error occurred"
            })
        })
}