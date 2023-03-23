import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

type loginFields = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFields>();
  const { data: session } = useSession();

  if (!session) {
    console.log("No session exists");
  }

  if (session) {
    console.log("Session exists");
    void router.push("/quote");
  }

  const onSubmit: SubmitHandler<loginFields> = async (data, event) => {
    event?.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });

    if (!res) {
      console.log("Failed Response");
      return;
    }

    if (res.error) {
      console.log(`Response Error: ${res.error}`);
      return;
    }

    console.log("Response Success");
    void router.push("/quote");
  };

  if (errors.email) {
    console.log("Email validation error");
  }

  if (errors.password) {
    console.log("Password validation error");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 py-2 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-md bg-neutral-900 px-4 py-8 shadow-md sm:px-10">
        <div>
          <h1 className="my-6 text-center text-4xl font-extrabold text-amber-500">
            Open Fuel
          </h1>
          <h2 className="text-center text-3xl font-medium text-neutral-300">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-100"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    className="block w-full rounded-md border border-gray-300 bg-neutral-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-100"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    {...register("password", { required: true })}
                    className="block w-full rounded-md border border-gray-300 bg-neutral-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between"></div>
            <div>
              <button
                type="submit"
                className="mt-6 flex w-full justify-center rounded-md border border-transparent bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
