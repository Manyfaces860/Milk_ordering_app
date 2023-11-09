import Link from 'next/link'
import React from 'react'

const AdminDashboard = () => {
  return (
    <div className='flex flex-col justify-start gap-8 p-24'>
      <Link className='btn btn-primary m-1' href={'/admindashboard/managusers'}>manage Users</Link>
      <Link className='btn btn-primary m-1' href={'/'}>manage Farmers</Link>
      <Link className='btn btn-primary m-1' href={'/'}>manage Issues and system oversight</Link>
      <Link className='btn btn-primary m-1' href={'/'}>manage Inventory</Link>
    </div>
  )
}

export default AdminDashboard