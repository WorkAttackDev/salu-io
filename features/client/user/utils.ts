export const initializeGoogleLogin = (
  handleCredentialResponse: (response: any) => void
) => {
  // @ts-ignore
  window.google.accounts.id.initialize({
    client_id:
      "463729900034-6ro4j66jeq4f6c4j7gbe57p7fmcnvptl.apps.googleusercontent.com",
    callback: handleCredentialResponse,
  });

  // @ts-ignore
  window.google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    {
      theme: "outline",
      size: "medium",
      shape: "pill",
      text: "$ {button.text}",
    } // customization attributes
  );

  // @ts-ignore
  window.google.accounts.id.prompt();
};
