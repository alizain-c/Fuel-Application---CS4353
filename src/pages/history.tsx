import { useSession } from "next-auth/react";
import router from "next/router";
import { api } from "../utils/api";

const History = () => {
  const { status } = useSession();

  const { data } = api.quote.getAll.useQuery();

  if (status === "unauthenticated") {
    void router.push("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center bg-neutral-900">
      <div className="w-full max-w-3xl">
        <div>
          <h1 className="my-6 text-center text-4xl font-extrabold text-amber-500">
            Open Fuel
          </h1>
          <h2 className="text-center text-3xl font-medium text-neutral-300">
            Your Previous Quotes
          </h2>
        </div>
        <div className="mt-4 flex flex-col items-center justify-center">
          <table className="mx-auto table w-full bg-neutral-800 text-sm font-medium text-gray-100">
            <thead className="bg-neutral-900">
              <tr className="text-white">
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Delivery Date</th>
                <th className="px-4 py-2">Gallons</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody className="bg-neutral-600 text-center">
              {data?.length != 0 ? (
                <>
                  {data?.map((quote) => (
                    <tr key={quote.id} className="flex-grow">
                      <td className="px-4 py-2.5">{quote.address}</td>
                      <td className="px-4 py-2.5">
                        {quote.delivery.toDateString()}
                      </td>
                      <td className="px-4 py-2.5">{quote.gallons}</td>
                      <td className="px-4 py-2.5">${quote.price}</td>
                      <td className="px-4 py-2.5">${quote.total}</td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr className="flex-grow">
                  <td className="px-4 py-2" colSpan={5}>
                    No Quotes Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
