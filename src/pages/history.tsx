import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useTable, useSortBy, Column } from "react-table";
import rawData from "../server/hist";

type Data = {
  gallonsRequested: number;
  deliveryAddress: string;
  deliveryDate: string;
  suggestedPrice: number;
  totalAmountDue: number;
};

const data: Data[] = rawData;

interface TableProps {
  columns: Column[];
  data: Data[];
}

const columns: Column[] = [
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

const History = () => {

  const Table: React.FC<TableProps> = ({ columns, data }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable(
        {
          columns,
          data,
        },
        useSortBy
      );

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

export default History;
