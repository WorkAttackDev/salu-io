import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../core/components/Button";
import InputField from "../../core/components/InputField";
import { linksObj } from "../../core/data/links";

type ValidationParams = {
  email: string;
  password: string;
  verifyPassword?: string;
};

type Props<VP> = {
  onSubmit: SubmitHandler<VP>;
  type?: "login" | "signup" | "forgot-password" | "reset-password";
  submitText: string;
};

export const AuthForm = ({
  onSubmit,
  submitText,
  type = "login",
}: Props<ValidationParams>) => {
  const { register, handleSubmit } = useForm<ValidationParams>();

  return (
    <form
      className='grid shadow-sm gap-16 w-full py-16 rounded-base max-w-3xl'
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className='text-7xl mx-auto font-medium'>Salu.io</h1>
      <div className='flex w-full h-20  text-2xl'>
        {type !== "reset-password" ? (
          <>
            <Link href={linksObj.login.url}>
              <a
                className={`flex justify-center items-center duration-200 w-full border-b-2 hover:text-brand hover:border-brand ${
                  type === "login"
                    ? "border-brand text-brand cursor-default"
                    : "text-brand-gray-1"
                }`}
              >
                {linksObj.login.label}
              </a>
            </Link>
            {/* <button
              type='button'
              disabled
              className={` w-full border-b-2 ${
                type === "signup"
                  ? "border-brand text-brand cursor-default"
                  : "text-brand-gray-2 border-brand-gray-2"
              } disabled:cursor-not-allowed`}
            >
              {linksObj.signup.label}
            </button> */}
          </>
        ) : (
          <p
            className={`flex justify-center items-center w-full border-b-2  text-brand`}
          >
            {linksObj.resetPassword.label}
          </p>
        )}
      </div>
      <fieldset className='grid items-start gap-8 px-16'>
        {type !== "reset-password" && (
          <InputField
            autoComplete='on'
            type='email'
            labelText='e-mail'
            maxLength={200}
            {...register("email")}
          />
        )}
        {type !== "forgot-password" && (
          <InputField
            type='password'
            labelText='password'
            maxLength={250}
            {...register("password")}
          />
        )}

        {type === "reset-password" && (
          <InputField
            type='password'
            labelText='digite novamente a password'
            maxLength={250}
            {...register("verifyPassword")}
          />
        )}
      </fieldset>
      <section className='flex justify-between flex-wrap items-center mx-16'>
        <Button type='submit'>{submitText}</Button>
        {type === "login" && <div id='buttonDiv'></div>}
      </section>
      {type === "login" && (
        <Link href={linksObj.forgotPassword.url}>
          <a className='text-brand-gray-1 mx-auto text-lg text-center duration-200 hover:text-brand'>
            {linksObj.forgotPassword.label}
          </a>
        </Link>
      )}
    </form>
  );
};
