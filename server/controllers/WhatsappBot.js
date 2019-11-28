import { google } from 'googleapis';
import dotenv from 'dotenv';
import twilio from 'twilio';
dotenv.config();

var rota;
const {
  SID: accountSid,
  KEY: TwilloAuthToken,
  APIKEY: googleApiKey,
  CX: cx
} = process.env;

twilio(accountSid, TwilloAuthToken);
const { MessagingResponse } = twilio.twiml;
const customsearch = google.customsearch('v1');

/**
 * @class WhatsappBot
 * @description class will implement bot functionality
 */
class WhatsappBot {
  /**
   * @memberof WhatsappBot
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @returns {object} - object representing response message
   */


  static async googleSearch(req, res, next) {
console.log(rota);
    const twiml = new MessagingResponse();
if (rota == undefined) {
    const q = req.body.Body;

    try {

      
      if (isNaN(q)) {
        twiml.message(`pf digite o numero da sua linha`);
        }
      else {
        rota = q;
        twiml.message(`pf partilhe a sua localizacao`)
        }

      res.set('Content-Type', 'text/xml');

      return res.status(200).send(twiml.toString());
    } catch (error) {
      return next(error);
    }
  }
else{
    const q = req.body
    if (q.Latitude == undefined) {
        const client = require('twilio')(accountSid, TwilloAuthToken);
        client.messages
            .create({
            from: 'whatsapp:+14155238886',
            body: `pf partilhe a sua localizacao`,
            to: q.From
        })
        console.log(q)
        }
    else {
       var model = {
            tel: req.body.From,
            rota: rota,
            lat: req.body.Latitude,
            long: req.body.Longitude,
            hora: Date.now()
        }
    console.log(model)
    }
    }
}
}

export default WhatsappBot;
