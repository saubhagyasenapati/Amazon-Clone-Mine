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
        from:'gmail',
        to:options.email,
        subject:options.subject,
        text:options.message,
    };
    await transporter.sendMail(mailOption)
};

module.exports=sendEmail;