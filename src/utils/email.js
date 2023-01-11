import nodemailer from "nodemailer";

export default function (mail, subject, htmlConttent) {
  const mailTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "manhtu2272002@gmail.com",
      pass: "jrkmstwvuqyetzlg",
    },
  });
  const options = {
    from: "manhtu2002227@gmail.com",
    to: mail,
    subject: subject,
    html: htmlConttent,
  };

  return mailTransporter.sendMail(options, (err) => {
    if (err) {
      console.log("Erroor OOccured ", err);
    } else {
      console.log("Email has sent !");
    }
  });
}
