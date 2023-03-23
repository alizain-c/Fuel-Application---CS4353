import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useTable, useSortBy } from "react-table";

const History = () => {
  const data = [
    {
      gallonsRequested: 100,
      deliveryAddress: "123 Main St",
      deliveryDate: "2022-02-28",
      suggestedPrice: 2.5,
      totalAmountDue: 250,
    },
    {
      gallonsRequested: 150,
      deliveryAddress: "456 Elm St",
      deliveryDate: "2022-03-01",
      suggestedPrice: 2.75,
      totalAmountDue: 412.5,
    },
    {
      gallonsRequested: 200,
      deliveryAddress: "789 Oak St",
      deliveryDate: "2022-03-02",
      suggestedPrice: 3.0,
      totalAmountDue: 600,
    },
    {
      gallonsRequested: 300,
      deliveryAddress: "456 Pine St",
      deliveryDate: "2022-03-05",
      suggestedPrice: 3.25,
      totalAmountDue: 975,
    },
    {
      gallonsRequested: 250,
      deliveryAddress: "890 Maple St",
      deliveryDate: "2022-03-06",
      suggestedPrice: 3.5,
      totalAmountDue: 875,
    },
    {
      gallonsRequested: 150,
      deliveryAddress: "567 Cedar St",
      deliveryDate: "2022-03-08",
      suggestedPrice: 3.75,
      totalAmountDue: 562.5,
    },
    {
      gallonsRequested: 200,
      deliveryAddress: "234 Birch St",
      deliveryDate: "2022-03-10",
      suggestedPrice: 4.0,
      totalAmountDue: 800,
    },
    {
      gallonsRequested: 100,
      deliveryAddress: "891 Elm St",
      deliveryDate: "2022-03-11",
      suggestedPrice: 4.25,
      totalAmountDue: 425,
    },
    {
      gallonsRequested: 300,
      deliveryAddress: "678 Oak St",
      deliveryDate: "2022-03-12",
      suggestedPrice: 4.5,
      totalAmountDue: 1350,
    },
    {
      gallonsRequested: 250,
      deliveryAddress: "345 Main St",
      deliveryDate: "2022-03-15",
      suggestedPrice: 4.75,
      totalAmountDue: 1187.5,
    },
    {
      gallonsRequested: 150,
      deliveryAddress: "901 Pine St",
      deliveryDate: "2022-03-18",
      suggestedPrice: 5.0,
      totalAmountDue: 750,
    },
    {
      gallonsRequested: 200,
      deliveryAddress: "234 Maple St",
      deliveryDate: "2022-03-20",
      suggestedPrice: 5.25,
      totalAmountDue: 1050,
    },
    {
      gallonsRequested: 100,
      deliveryAddress: "789 Cedar St",
      deliveryDate: "2022-03-21",
      suggestedPrice: 5.5,
      totalAmountDue: 550,
    },
    {
      gallonsRequested: 300,
      deliveryAddress: "567 Birch St",
      deliveryDate: "2022-03-22",
      suggestedPrice: 5.75,
      totalAmountDue: 1725,
    },
    {
      gallonsRequested: 250,
      deliveryAddress: "123 Elm St",
      deliveryDate: "2022-03-25",
      suggestedPrice: 6.0,
      totalAmountDue: 1500,
    },
    {
      gallonsRequested: 150,
      deliveryAddress: "456 Oak St",
      deliveryDate: "2022-03-28",
      suggestedPrice: 6.25,
      totalAmountDue: 937.5,
    },
    {
      gallonsRequested: 200,
      deliveryAddress: "789 Pine St",
      deliveryDate: "2022-03-30",
      suggestedPrice: 6.5,
      totalAmountDue: 1300,
    },
  ];

  const columns = [
    {
      Header: "Gallons Requested",
      accessor: "gallonsRequested",
      sortType: "basic",
    },
    {
      Header: "Delivery Address",
      accessor: "deliveryAddress",
      sortType: "basic",
    },
    {
      Header: "Delivery Date",
      accessor: "deliveryDate",
      sortType: "basic",
    },
    {
      Header: "Suggested Price",
      accessor: "suggestedPrice",
      sortType: "basic",
    },
    {
      Header: "Total Amount Due",
      accessor: "totalAmountDue",
      sortType: "basic",
    },
  ];

  const Table = ({ columns, data }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable(
        {
          columns,
          data,
        },
        useSortBy
      );

    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (!session) {
        void router.push("/login");
      }
    }, [router, session]);

    return (
      <div>
        <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 py-2 sm:px-6 lg:px-8">
          <div className="max-w-8xl w-full rounded-md bg-neutral-900 px-4 py-8 shadow-md sm:px-10">
            <div>
              <h1 className="my-6 text-center text-4xl font-extrabold text-amber-500">
                Open Fuel
              </h1>
              <h2 className="text-center text-3xl font-medium text-neutral-300">
                Your Previous Quotes
              </h2>
            </div>
            <div className="mt-8">
              <table
                className="mx-auto table w-full bg-neutral-800 text-sm font-medium text-gray-100"
                {...getTableProps()}
              >
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          className="w-1/5 px-4 py-2"
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        className={`text-center ${
                          i % 2 === 0 ? "bg-neutral-600" : "bg-neutral-800"
                        }`}
                      >
                        {row.cells.map((cell) => {
                          return (
                            <td
                              className="px-4 py-2"
                              style={{ minWidth: "20%" }}
                              {...cell.getCellProps()}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <Table columns={columns} data={data} />;
};
// <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 py-2 sm:px-6 lg:px-8">
//     <div className="w-full max-w-2xl rounded-md bg-neutral-900 px-4 py-8 shadow-md sm:px-10">
//         <div>
//             <h1 className="my-6 text-center text-4xl font-extrabold text-amber-500">
//                 Open Fuel
//             </h1>
//             <h2 className="text-center text-3xl font-medium text-neutral-300">
//                 Your Previous Quotes
//             </h2>
//         </div>
//         <div className="mt-8">
//             <table className="table w-full text-sm font-medium text-gray-100 mx-auto bg-neutral-800">
//                 <thead>
//                     <tr>
//                         <th className="px-4 py-2">Gallons Requested</th>
//                         <th className="px-4 py-2">Delivery Address</th>
//                         <th className="px-4 py-2">Delivery Date</th>
//                         <th className="px-4 py-2">Suggested Price / gallon</th>
//                         <th className="px-4 py-2">Total Amount Due</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((data, index) => (
//                         <tr className={`text-center ${index % 2 === 0 ? 'bg-neutral-600' : 'bg-neutral-800'}`}>
//                         <td className="px-4 py-2">{data.gallonsRequested}</td>
//                         <td className="px-4 py-2">{data.deliveryAddress}</td>
//                         <td className="px-4 py-2">{data.deliveryDate}</td>
//                         <td className="px-4 py-2">{data.suggestedPrice}</td>
//                         <td className="px-4 py-2">{data.totalAmountDue}</td>
//                     </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     </div>
// </div>
//     );
// };

export default History;
