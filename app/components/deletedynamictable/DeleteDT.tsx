import Link from 'next/link'
import React from 'react'


interface Props {
    columnNames : string[],
    columnItems : any[][],
    showModal : (userId : number) => void;
}


const DeleteDT = ({columnNames , columnItems , showModal } : Props) => {
  return (
    <>
        <div
        className="overflow-x-scroll rounded-md"
        // style={{ width: "90vw", height: "70vh" }}
      >
        <table className="table bg-yellow-900 rounded-md p-3">
          {/* head */}
          <thead>
            <tr>
              {columnNames.map((item) => <th>{item}</th>)}
            </tr>
          </thead>
          <tbody>
            {columnItems.map((item) => <tr key={item[4]} className="bg-base-200">{item.map((object) => <td>  {object}  </td> )} <td> <button className='btn btn-warning' onClick={() => {
                showModal(item[3]);
            }} > DeleteUser </button> </td> </tr>)}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default DeleteDT