export default async (req, res) => {
  const { method } = req
  switch (method) {
    case 'POST':
      const { Vonage } = require('@vonage/server-sdk');

      const vonage = new Vonage({
        apiKey: process.env.VONAGE_API_KEY,
        apiSecret: process.env.VONAGE_API_SECRET,
        signatureSecret: process.env.VONAGE_SIGNATURE_SECRET,
        signatureMethod: "MD5 HASH signature"
    }, { debug: true } )  

      const resp = await vonage.sms.send({to: `63${req.body.contact}`, from: 'Vonage APIs', 
        text: `Greetings, ${req.body.patientName} !\n\nPlease come to Blessed Hope Maternity and Lying-in Clinic at ${req.body.date}. Your schedule is ${req.body.timeslot}
        If you want to cancel the appointment , visit our official patient website , your cancellation code is: ${req.body.cancellationCode}\n\n`})
        
      res.status(200).json({ success: true })
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}


