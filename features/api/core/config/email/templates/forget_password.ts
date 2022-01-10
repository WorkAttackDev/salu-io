export const forgetPasswordHTMLTemplate = (
  forgetPasswordLink: string
): string => {
  return `
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>WorkAttack</title>
    <link
      href="https://fonts.googleapis.com/css?family=Rubik"
      rel="stylesheet"
      type="text/css"
    />
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 40px 20px;
        background-color: #ededed;
      }
    </style>
  </head>
  <body
    style="
      color: #1e252b;
      text-align: center;
      font-family: 'Rubik', 'Lucida Sans Regular', 'Lucida Grande',
        'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    "
  >
    <img
      style="margin: 20px;"
      width="80px"
      height="auto"
      src="https://workattackangola.com/_next/image?url=%2Ficons%2F__quem_somos.svg&w=32&q=75"
      alt="Workattack logo"
    />
    <div
      style="
        background-color: #fff;
        display: flex;
        flex-direction: column;
        padding: 20px;
        border-radius: 10px;
        margin: auto;
        max-width: 480px;
        text-align: start;
      "
    >
      <h1 style="color: #ff811c;">Esqueceu a sua password?</h1>
      <p style="color: inherit; margin-bottom: 1px;">
        Oi, recebemos um pedido de recuperação de password?
      </p>
      <p style="color: inherit;">
        Vamos criar uma password!
      </p>
      <a
        href="${forgetPasswordLink}"
        target="_blank"
        style="
          background-color: #ff811c;
          padding: 10px;
          text-decoration: none;
          color: white;
          border-radius: 10px;
          text-align: center;
          margin: 20px 0;
        "
        >Criar Nova Password</a
      >
      <p style="color: #a5a5a5; font-size: 14px; text-align: center;">
        não fez um pedido de recuperação de password? Ignore este e-mail.
      </p>
    </div>
    <p style="font-size: 14px; text-align: center;">
      WorkAttack 2021
    </p>
  </body>
</html>

`;
};
