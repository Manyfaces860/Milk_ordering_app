import Link from 'next/link'
import { traceDeprecation } from 'process'
import React from 'react'
import { object } from 'zod'


interface Props {
    columnNames : string[],
    columnItems : string[][],
}


const DynamicTable = ({columnNames , columnItems } : Props) => {
  return (
    <div>
        <div
        className="overflow-x-auto"
        style={{ width: "90vw", height: "70vh" }}
      >
        <table className="table bg-yellow-900 rounded-md p-3">
          {/* head */}
          <thead>
            <tr>
              {columnNames.map((item) => <th>{item}</th>)}
            </tr>
          </thead>
          <tbody>
            {columnItems.map((item) => <tr key={item[4]} className="bg-base-200">{item.map((object) => <td> <Link href={`/admindashboard/managusers/${item[4]}`}> {object} </Link> </td> )}</tr>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DynamicTable