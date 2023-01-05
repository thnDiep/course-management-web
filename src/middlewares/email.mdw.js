import sgMail from "@sendgrid/mail"
import * as dotenv from 'dotenv'
dotenv.config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default function (message) {
    return new Promise((resolve, reject) => {
        try {

            sgMail
                .sendMultiple(message)
                .then((msg) => {
                    resolve(msg)

                })
                .catch((error) => {
                    reject(err)
                })
        } catch (err) {
            reject(err)
        }
    })

}
