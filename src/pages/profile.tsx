import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SelectUSState from 'react-select-us-states';

type profileFields = {
  fullName: string;
  address1: string;
  address2: string;
  city: string;
  zipcode: string;
};

const ProfileManagement = () => {
  const {
    register,
    handleSubmit,
  } = useForm<profileFields>();

  const [selectedState, setSelectedState] = useState('');

  const onSubmit: SubmitHandler<profileFields> = (data, event) => {
    event?.preventDefault();
    console.log({...data, state: selectedState});
  };

  const setNewValue = (value) => {
    setSelectedState(value);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 py-2 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-md bg-neutral-900 px-4 py-8 shadow-md sm:px-10">
        <div>
          <h1 className="my-6 text-center text-4xl font-extrabold text-amber-500">
            Open Fuel
          </h1>
          <h2 className="text-center text-3xl font-medium text-neutral-300">
            Edit your Profile
          </h2>
        </div>
        <div className="mt-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-100"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="fullName"
                    maxLength="50"
                    required
                    {...register("fullName", {
                      required: true,
                    })}
                    className="block w-full rounded-md border border-gray-300 bg-neutral-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-6">
              <label
                  className="block text-sm font-medium text-gray-100"
                >
                  Address 1
                </label>
                <div className="mt-1">
                  <input
                    id="address1"
                    maxLength="100"
                    required
                    {...register("address1", {
                      required: true,
                    })}
                    className="block w-full rounded-md border border-gray-300 bg-neutral-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-6">
              <label
                  className="block text-sm font-medium text-gray-100"
                >
                  Address 2
                </label>
                <div className="mt-1">
                  <input
                    id="address2"
                    maxLength="100"
                    {...register("address2", {
                      
                    })}
                    className="block w-full rounded-md border border-gray-300 bg-neutral-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-6">
              <label
                  className="block text-sm font-medium text-gray-100"
                >
                  City
                </label>
                <div className="mt-1">
                  <input
                    id="city"
                    maxLength="100"
                    required
                    {...register("city", {
                      required: true,
                    })}
                    className="block w-full rounded-md border border-gray-300 bg-neutral-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-6">
              <label
                  className="block text-sm font-medium text-gray-100"
                >
                  State
                </label>
                <div className="mt-1">
                    <SelectUSState
                     onChange={setNewValue} 
                     id="state" 
                     required 
                     className="block w-full rounded-md border border-gray-300 bg-neutral-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                    />
                </div>
                <div className="mt-6">
              <label
                  className="block text-sm font-medium text-gray-100"
                >
                  Zipcode
                </label>
                <div className="mt-1">
                  <input
                    id="zipcode"
                    maxLength="9"
                    minLength="5"
                    pattern="[0-9]*"
                    required
                    {...register("zipcode", {
                      required: true,
                    })}
                    className="block w-full rounded-md border border-gray-300 bg-neutral-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
                  />
                </div>
              </div>
              </div>
            </div>
            <div className="flex items-center justify-between"></div>
            <div>
              <button
                type="submit"
                className="mt-6 flex w-full justify-center rounded-md border border-transparent bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
