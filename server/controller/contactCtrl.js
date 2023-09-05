const Contact = require("../model/contact.model")

const contactCtrl = {
    getContact: async (req, res) => {
        try {
            const contact = await Contact.find()

            res.status(200).json({ contact })

        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    addContact: async (req,res) => {
        try {

            const{ firstName, email, lastName, phone, message } = req.body;
     
            const contact = await Contact.create({
                firstName, email, message, phone, lastName
            })
     
            const savedContact = await contact.save()
     
            res.json({ savedContact })
              
         } catch (err) {
             res.status(500).json({ error: err.message })
         }
    },
    deleteContact: async (req,res) => {
        try {
            let success = false
    
            let contact = await Contact.findById( req.params.id )
            if(!contact){
                return res.status(400).json({ error: "Item deleted" })
            }
    
            contact = await Contact.findByIdAndDelete( req.params.id ) 
    
            success = true
    
            res.json({ success, contact })
            
        } catch (err) {
            cres.status(500).json({ error: err.message })
        }
    }
}

module.exports = contactCtrl