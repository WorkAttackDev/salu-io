export const feedBackEmailTemplate = (
  name: string,
  // email: string,
  message: string
) => `
  <div>
    <h1>Obrigado pelo feedback Sr(a) ${name}</h1>

    <h4>A sua Mensagem Foi</h4>

    <p>
      ${message}
    </p>

    <b/>

    <p>Entraremos em contacto assim possível</p>

  </div>
`;
