const createFormQuery = require("../db/queries/createFormQuery");
const selectUserByEmailQuery  = require("../db/queries/selectUserByEmailQuery");
const { sendMail, generateError } = require ('../helpers');


const newForm = async (req, res, next) => {
  try {
    const { full_name, email, mota, mota4, jeep} = req.body;

    if (!full_name || !email) {
      generateError('Faltam campos a preencher', 400);
    } else if (mota === 0 && mota4 === 0 && jeep === 0){
      generateError('Você tem que escolher uma reserva', 400);
    }
    await createFormQuery(full_name, email, mota, mota4, jeep);

    const vars = await selectUserByEmailQuery(email);

    const userId = vars.userId;
    const motaD = vars.motaD;
    const mota4D = vars.mota4D;
    const jeepD = vars.jeepD;

    const bookingPrice = ((motaD + mota4D + jeepD) * 30);

    const subject = 'Amigos de Gandra TT Reserva';
    
    const emailContent = `
    Prezado cliente ${full_name},

    Muito obrigado por reservar no Amigos Gandra TT.

    Este é o seu número de reserva: ${userId}.

    Este é o montante da sua reserva: ${bookingPrice}€.

    Tem que indicar seu número de reserva no conceito da transferência por favor.

    Você pode fazer o pagamento através dos seguintes meios:

    -Número de conta bancária: 0033 0000 0009 5467 2070 5

    -MB Way: 917662533

    Agradecemos muito que queiram desfrutar connosco.

    Cumprimentos Amigos Gandra TT.`;


    await sendMail(email, subject, emailContent);
    
    res.status({
      code: 200,
      status: "ok",
      message: "Form filled ok",
    }).redirect("/form.html");

  } catch (err) {
    next(err);
  };
};

module.exports = newForm;