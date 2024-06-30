const nodemailer= require ('nodemailer');
const {google}= require('googleapis');



const oAuth2Client= new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(){
    try{
        const accessToken= await oAuth2Client.getAccessToken();

        const transport=nodemailer.createTransport({
            service: 'gmail',
            auth:{
                type:'OAuth2',
                user:'anuragdeepkujur758@gmail.com',
                clientId: CLIENT_ID,
                clientSecret:CLIENT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToken: accessToken
            },
        });
        const mailOptions={
            from: 'Anurag Deep Kujur <anuragdeepkujur758@gmail.com>',
            to: 'adkujur.mtech2021.it@nitrr.ac.in',
            subject:" Hello from gmail api",
            text:'Hello Myself',
            html:'<h1>HEllo myself</h1>',
        };
        const result=await transport.sendMail(mailOptions);
        return result;
    } catch(error){
        return error;
    }
}

sendMail()
    .then((result)=> console.log('email sent....',result))
    .catch((error)=>console.log(error.message));