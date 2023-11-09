'use client';

import { GetAllData } from '@/app/utility/GetAllData';
import React, { useEffect, useState } from 'react'


const specificUser = ( {  params : { fuser }} : { params : { fuser : string } } ) => {

    const [user , setUser] = useState<any>()
    fuser = fuser.replace('%40','@')
    useEffect(() => {
        const GetUserData = async () => {
          const response = await GetAllData("/api/getallusers", {
            dynamic : 'no',
            user : fuser
          });
          setUser(response.data)
        };
        GetUserData();
      }, []);

  return (
    <div>
      {user && <div>

      </div> }
    </div>
  )
}

export default specificUser