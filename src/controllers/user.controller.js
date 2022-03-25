
const express = require("express");

const router = express.Router();

const transporter = require("../configs/mail");

const User1 = require("../models/user.model");

async function MailToUser(User)
{
    try
    {
        transporter.sendMail({
            from : '"Rahul Rathor" <rahulrathor@example.com>',
            to : User.email,
            subject : `Welcome to ABC system ${User.first_name} ${User.last_name}`,
            text : `Hi ${User.first_name}, Please confirm your email address`,
            html : `<b>Hi ${User.first_name}, Please confirm your email address</b>`
        });
    }
    catch(error)
    {
        console.log({message : error.message});
    }
}

async function MailToAdmin(Admin, User)
{
    // try
    // {
        transporter.sendMail({

            from : '"Rahul Rathor" <rahulrathor@example.com>',
            to : Admin.email,
            subject : `${User.first_name} ${User.last_name} has registered with us`,
            text : `Please welcome ${User.first_name} ${User.last_name}`,
            html : `<b>Please welcome ${User.first_name} ${User.last_name}</b>`
        })
    // }
    // catch(error)
    // {

    // }
}

router.post("", async(req,res) =>
{
    try
    {
        const User = await User1.create(req.body);

        if(User.role != "admin")
        {
            let SendToAdminArray = (
                await User1.find({role : "admin"}).limit(5).lean().exec()
            );
            console.log('SendToAdminArray:', SendToAdminArray)
            SendToAdminArray.forEach(element =>
            {
                MailToAdmin(element, User);    
            });

            MailToUser(User);
        }
        return res.status(201).send({User : User});
    }
    catch(error)
    {
        return res.status(500).send({message : error.message});
    }
});



router.get("", async(req,res) =>
{
    try
    {
        const page = req.query.page || 1;
        const pagesize = req.query.pagesize || 10;
        const skip = ( page - 1) * pagesize;
        const User = await User1.find().skip(skip).limit(pagesize).lean().exec();

        const TotalPages = Math.floor((
            await User1.find().countDocuments())/pagesize
        );

        return res.status(200).send({User : User, TotalPages : TotalPages});
    }
    catch(error)
    {
        return res.status(500).send({message : error.message});
    }
})

module.exports = router;