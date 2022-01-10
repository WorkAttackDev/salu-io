import jwt_decode from "jwt-decode";
import Link from "next/link";
import { useEffect } from "react";
import { LoginWithGoogleValidationParams } from "../../../shared/lib/validation";
import Button from "../../core/components/Button";
import InputField from "../../core/components/InputField";
import { links } from "../../core/data/links";
import { initializeGoogleLogin } from "../utils";

type Props = {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: any
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onLoginWithGoogle?: (data: LoginWithGoogleValidationParams) => void;
  type?: "login" | "signup" | "forgot-password" | "reset-password";
  submitText: string;
};

export const AuthForm = ({
  onSubmit,
  submitText,
  handleChange,
  onLoginWithGoogle,
  type = "login",
}: Props) => {
  useEffect(() => {
    if (type !== "login") return;

    async function handleCredentialResponse(response: any) {
      const decodedToken = jwt_decode(response.credential) as any;
      onLoginWithGoogle?.(decodedToken);
    }

    initializeGoogleLogin(handleCredentialResponse);
  }, [type]);

  return (
    <form
      className='grid shadow-sm gap-16 w-full py-16 rounded-base bg-white max-w-3xl'
      onSubmit={onSubmit}
    >
      <h1 className='text-7xl mx-auto font-medium logo-font'>Broas</h1>
      <div className='flex w-full h-20 bg-brand-gray text-2xl'>
        {type !== "reset-password" ? (
          <>
            <Link href={links.login}>
              <a
                className={`flex justify-center items-center duration-200 w-full border-b-2 hover:text-brand-gray-3 hover:border-brand-gray-3 ${
                  type === "login"
                    ? "border-brand-gray-3 text-brand-gray-3 cursor-default"
                    : "text-brand-gray-1"
                }`}
              >
                iniciar sessão
              </a>
            </Link>
            <button
              type='button'
              disabled
              className={` w-full border-b-2 ${
                type === "signup"
                  ? "border-brand-gray-3 text-brand-gray-3 cursor-default"
                  : "text-brand-gray-1"
              } disabled:cursor-not-allowed`}
            >
              criar conta
            </button>
          </>
        ) : (
          <p
            className={`flex justify-center items-center w-full border-b-2  text-brand-gray-3`}
          >
            redefinir password
          </p>
        )}
      </div>
      <fieldset className='grid gap-8 px-16'>
        {type !== "reset-password" && (
          <InputField
            autoComplete='email'
            type='email'
            labelText='e-mail'
            maxLength={200}
            onChange={(e) => handleChange(e, "email")}
          />
        )}
        {type !== "forgot-password" && (
          <InputField
            type='password'
            labelText='password'
            maxLength={250}
            onChange={(e) => handleChange(e, "password")}
          />
        )}

        {type === "reset-password" && (
          <InputField
            type='password'
            labelText='digite novamente a password'
            maxLength={250}
            onChange={(e) => handleChange(e, "againPassword")}
          />
        )}
      </fieldset>
      <section className='flex justify-between flex-wrap items-center mx-16'>
        <Button type='submit'>{submitText}</Button>
        {type === "login" && <div id='buttonDiv'></div>}
      </section>
      {type === "login" && (
        <Link href={links.forgotPassword}>
          <a className='text-brand-gray-1 mx-auto text-lg text-center duration-200 hover:text-brand-gray-3'>
            esqueceu a password?
          </a>
        </Link>
      )}
    </form>
  );
};
