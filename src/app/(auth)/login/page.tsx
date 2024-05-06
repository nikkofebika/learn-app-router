"use client";
import AuthLayout from "@/components/layouts/AuthLayout";
import Button from "@/components/ui/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type IFormInputs = {
  email: string,
  password: string
}

const schema = yup.object().shape({
  email: yup.string().email().required("Email required"),
  password: yup.string().required().min(3)
});

export default function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({ resolver: yupResolver(schema) });

  const mutation = useMutation({
    mutationFn: async (data: IFormInputs) => {
      console.log('data mutationFn', data)
      return await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: '/'
      })
    }
  })

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    console.log('data', data)

    // const res = mutation.mutate(data)
    // console.log('res', res)

    // e.preventDefault();

    const res: any = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: '/'
    });
    console.log('res', res)
  }
  console.log('errors', errors)
  return (
    <AuthLayout title="Sign In to Your Account">
      {errors.root && <p className="text-red font-bold">{errors.root.message}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="mb-3 block text-lg font-medium text-black dark:text-white">
            Email
          </label>
          <input
            placeholder="Enter your email address"
            {...register("email")}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          {errors.email && <p className="text-red font-bold">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="mb-3 block text-lg font-medium text-black dark:text-white">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your email password"
            {...register("password")}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          {errors.password && <p className="text-red font-bold">{errors.password.message}</p>}
        </div>

        <Button className="bg-primary w-full mb-5" type="submit">
          Login
        </Button>
      </form>

      <Button className="flex justify-center bg-gray w-full mb-5 border-dark text-black-2 gap-3.5 hover:bg-opacity-70">
        <span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_191_13499)">
              <path
                d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                fill="#4285F4"
              />
              <path
                d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                fill="#34A853"
              />
              <path
                d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                fill="#FBBC05"
              />
              <path
                d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                fill="#EB4335"
              />
            </g>
            <defs>
              <clipPath id="clip0_191_13499">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
        Sign in with Google
      </Button>

      <div className="mt-6 text-center">
        <p>
          Don’t have any account?{" "}
          <Link href="/sign-up" className="text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
