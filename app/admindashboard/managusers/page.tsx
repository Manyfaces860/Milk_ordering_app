'use client';

import DynamicTable from '@/app/components/dynamictable/DynamicTable'
import { GetAllData } from '@/app/utility/GetAllData';
import React, { useEffect, useState } from 'react'

const manageUsers = () => {
    const [ columnNames, setNames ] = useState([]);
    const [ columnItems, setItems ] = useState<string[][]>([]);

    useEffect(() => {
        const GetUserData = async () => {
          const response = await GetAllData("/api/getallusers", {
            dynamic : 'yes',
            user : ''
          });
          setItems(response.data.columnItems);
          setNames(response.data.columnNames);
        };
        GetUserData();
      }, []);

  return (
    <div>
        <DynamicTable columnNames={columnNames} columnItems={columnItems}  />
    </div>
  )
}

export default manageUsers