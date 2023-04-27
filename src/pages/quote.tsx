import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useState } from "react";
import Navigation from "../components/navigation";
import { useSession } from "next-auth/react";
import router from "next/router";

import { api } from "../utils/api";

type QuoteFields = {
  gallonsRequested: number;
  deliveryAddress: string;
  deliveryDate: Date;
  state: string;
  zipCode: string;
};

const Quote = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteFields>();
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { status } = useSession();

  const { mutate } = api.quote.create.useMutation({
    onSuccess: (data) => {
      console.log(data);
      console.log("Quote Successfully created!");
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  // const { data } = api.quote.getAll.useQuery();

  if (status === "unauthenticated") {
    void router.push("/login");
  }

  const onSubmit: SubmitHandler<QuoteFields> = (data, event) => {
    event?.preventDefault();

    const numGal: number = +data.gallonsRequested;
    const stateId: string = data.state;
    const zipCode: string = data.zipCode;

    mutate({
      gallons: numGal,
      address: data.deliveryAddress,
      state: stateId,
      deliveryDate: deliveryDate,
      zip: zipCode,
    });
  };

  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 py-2 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-md bg-neutral-900 px-4 py-8 shadow-md sm:px-10">
          <div>
            <h1 className="my-6 text-center text-4xl font-extrabold text-amber-500">
              Open Fuel
            </h1>
            <h2 className="text-center text-3xl font-medium text-neutral-300">
              Get a Quote
            </h2>
          </div>
          <div className="mt-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <label
                  htmlFor="gallonsRequested"
                  className="block text-sm font-medium text-gray-100"
                >
                  Gallons Requested
                </label>
                <div className="mt-1">
                  <input
                    id="gallonsRequested"
                    type="number"
                    required
                    {...register("gallonsRequested", {
                      required: true,
                    })}
                    className="block w-full rounded-md border border-gray-300 bg-neutral-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="deliveryAddress"
                  className="block text-sm font-medium text-gray-100"
                >
                  Delivery Address
                </label>
                <div className="mt-1">
                  <input
                    id="deliveryAddress"
                    type="text"
                    {...register("deliveryAddress")}
                    className="block w-full rounded-md border border-gray-300 bg-neutral-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                  />
                </div>
              </div>
              <select
                id="state"
                {...register("state")}
                className="block w-full rounded-md border border-gray-300 bg-neutral-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
              >
                <option value="">Select a state</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-medium text-gray-100"
                >
                  Zip Code
                </label>
                <div className="mt-1">
                  <input
                    id="zipCode"
                    type="number"
                    {...register("zipCode")}
                    className="block w-full rounded-md border border-gray-300 bg-neutral-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="deliveryDate"
                  className="block text-sm font-medium text-gray-100"
                >
                  Delivery Date
                </label>
                <div className="mt-1">
                  <DatePicker
                    selected={deliveryDate}
                    onChange={(date: Date) => setDeliveryDate(date)}
                    className="block w-full rounded-md border border-gray-300 bg-neutral-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-amber-500 py-2 px-4 text-sm font-medium text-neutral-900 shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  Get Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
