
const nodeMailer=require("nodemailer");

const sendEmail=async(options)=>{
   
    const transporter=nodeMailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        service:'gmail',
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD
        }
    })
   
    const mailOption={
        from:process.env.SMTP_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message,
    };
    await transporter.sendMail(mailOption)
};

module.exports=sendEmail;
// const nodeMailer=require("nodemailer");

// const sendEmail=async(options)=>{
   
//     const transporter=nodeMailer.createTransport({
//         service:"SendinBlue",
//         auth:{
//             user:process.env.SMTP_MAIL,
//             pass:process.env.SMTP_PASSWORD
//         }
//     })
   
//     const mailOption={
//         from:process.env.SMTP_MAIL,
//         to:options.email,
//         subject:options.subject,
//         text:options.message,
//         html: '<h1>Please verify your email</h1><a href="www.google.com"><button>Verify</button>'
//     };
//     await transporter.sendMail(mailOption)
// };

// module.exports=sendEmail;