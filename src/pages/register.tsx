import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

type loginFields = {
  username_email: string;
  password: string;
  confirm_password: string
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<loginFields>();
  const onSubmit: SubmitHandler<loginFields> = (data, event) => {
    event?.preventDefault();
    console.log(data);
  };

  if (errors.username_email) {
    console.log("email error");
  }

  if (errors.password) {
    console.log("password error");
  }

  if (errors.confirm_password) {
    console.log("confirm password error");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 py-2 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-md bg-neutral-900 px-4 py-8 shadow-md sm:px-10">
        <div>
          <h1 className="my-6 text-center text-4xl font-extrabold text-amber-500">
            Open Fuel
          </h1>
          <h2 className="text-center text-3xl font-medium text-neutral-300">
            Register to create your account
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
                    placeholder = "johndoe@email.com"
                    type="email"
                    autoComplete="email"
                    {...register("username_email", {
                      required: true,
                      pattern: { 
                        value: /^\S+@\S+$/i,
                        message: "Enter a valid Email Address"
                      }
                    })}
                    className="block w-full rounded-md border border-gray-300 bg-neutral-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                  />
                  {errors.username_email && <p className="text-red-500">{errors.username_email.message}</p>}
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
                    {...register("password", { required: true,
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters"
                    } })}
                    className="block w-full rounded-md border border-gray-300 bg-neutral-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                  />
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium text-gray-100"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirm_password"
                    type="password"
                    autoComplete="current-password"
                    {...register("confirm_password", { required: true,
                      validate: value =>
                      watch('password') === value || "Your passwords do no match"
                    })}
                    className="block w-full rounded-md border border-gray-300 bg-neutral-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                  />
                  {errors.confirm_password && <p className="text-red-500">{errors.confirm_password.message}</p>}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between"></div>
            <div>
              <button
                type="submit"
                className="mt-6 flex w-full justify-center rounded-md border border-transparent bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
