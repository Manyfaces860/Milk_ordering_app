"use client";

import React, { useEffect, useState } from 'react'
import DynamicTable from '../components/dynamictable/DynamicTable'
import { GetAllData } from '../utility/GetAllData';
import Modal from '../components/modal/Modal';
import DeleteDT from '../components/deletedynamictable/DeleteDT';

const SeeUsers = () => {
  
    const [columnItems , setColumnItems] = useState<any[][]>([[]]);
    const [columnNames , setColumnNames] = useState<string[]>([]);
    const [modalIsVisible , setModalVisible] = useState(false);
    const [deleteUser , setDeleteuser] = useState(false);
    const [id , setId] = useState(0);

    useEffect(() => {
      const DeleteUser = async () => {
        const response = await GetAllData('/api/deleteuser' , {userid : id});
        // console.log(response);
        setModalVisible(false);
      }

      DeleteUser();

      const GetUserData = async () => {
            const response = await GetAllData('/api/getallusers' , {});
            setColumnItems(response.data.items);
            setColumnNames(response.data.names);
            console.log(response);
        } 
      GetUserData();

    },[deleteUser])


    const handleYes = () => {
      setDeleteuser(true);
    } 

    const showModal = (userId : number) => {
      setModalVisible(true);
      setId(userId);
    }

    const handleCut = () => {
      setModalVisible(false);
    }

  return (
    <div className='h-screen'>
        <DeleteDT columnItems={columnItems!} columnNames={columnNames!} showModal={showModal} />
        { modalIsVisible && <Modal handleCut={handleCut} handleYes={handleYes} />}
    </div>
  )
}

export default SeeUsers