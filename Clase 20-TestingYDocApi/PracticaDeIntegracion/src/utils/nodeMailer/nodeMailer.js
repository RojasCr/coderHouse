const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");


const sendMail = (receiver) => {
    const token = jwt.sign({email: receiver}, "secretMail", {expiresIn: "1h"});

    const transporter = nodemailer.createTransport({
        service: "gmail",
        user: "smto.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "criscoder2023@gmail.com",
            pass: "bcffchezzhqutgai"
        }
    });

    let link = `http://localhost:8080/restorePassword/${token}`;
    
    const mailOptions = {
        from: "criscoder2023@gmail.com",
        to: receiver,
        subject: "Prueba",
        html: `<a href=${link}><input type="button" value="Click para recuperar contraseña"></a>`
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) return console.log(error);
        console.log(`Mail enviado: ${info.response}`)
    })
}

module.exports = { sendMail };
