import React from 'react'

interface props {
    handleYes : () => void;
    handleCut : () => void;
}

const Modal = ({ handleCut, handleYes } : props ) => {
  return (
    <>
        <div className='absolute gap-4 bg-slate-700 w-screen h-screen top-0 left-0 flex flex-col justify-center items-center'>
            <p className='text-slate-400' >
                Are You sure?
            </p>
            <div className='flex gap-2'>
                <button className='btn btn-outline btn-success' onClick={()=>{handleYes()}}>yes i am!</button>
                <button className='btn btn-outline btn-error' onClick={()=>{handleCut()}}>absolutely not</button>
            </div>
        </div>   
    </>
  )
}

export default Modal