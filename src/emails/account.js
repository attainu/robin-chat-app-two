const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeMail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'mondalsaidul3232@gmail.com',
        subject:'Thanks for joining in!',
        text:`Welcome to this chat app ${name}.Create your own chat room and invite your friends.`
    })
}

const sendGoodbyMail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'mondalsaidul3232@gmail.com',
        subject:'Very sad moments!',
        text:`We were very happy togather ${name}.Let me know what made you to leave.`
    })
}

module.exports = {
    sendWelcomeMail,
    sendGoodbyMail

}

// sgMail.send({
//     to:'bibiasem007@gmail.com',
//     from:'mondalsaidul3232@gmail.com',
//     subject:'This is my first creation!',
//     text:'I hope this one acctually get to you'
// })