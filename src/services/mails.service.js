const nodemailer = require('nodemailer');
const { environment } = require('../../config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: environment.nodeMailer.address,
    pass: environment.nodeMailer.password
  }
});

module.exports = class MailsService {
  static async send(email) {
    const options = {
      from: 'no-reploy@latech.io',
      to: email
    };

    try {
      options.subject = 'Testing';
      options.text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet metus eu nisl ultricies facilisis volutpat nec purus. Phasellus in eros a urna rhoncus vulputate. Pellentesque tincidunt, lectus vitae pulvinar porta, velit nisl lacinia massa, vel pulvinar nunc tellus ut nulla. Nam tincidunt dapibus dolor sed auctor. Morbi eget leo aliquet, vulputate mi nec, tincidunt nibh. Etiam posuere bibendum mauris sed cursus. Morbi blandit elit nec imperdiet fermentum. Aliquam blandit quam vehicula lorem congue, quis dapibus velit aliquam.';

      await transporter.sendMail(options);
    } catch(error) {
      console.log({
        error
      });
    }
  }
};
