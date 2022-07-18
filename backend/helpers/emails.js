import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
    const { nombre, email, token } = datos;

    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "6d15bbcf995455",
            pass: "3ee22bc642c656"
        }
    });

    //Información del email
    const info = await transport.sendMail({
        from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Confirma tu cuenta",
        text: "Comprueba tu cuenta en UpTask",
        html: `

            <p>Hola ${nombre} Comprueba tu Cuenta en UpTask</p>
            <p>Tu cuenta esta ya casí lista solo debes comprobarla en el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}" >Confirmar Cuenta</a>
            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
    })
}



