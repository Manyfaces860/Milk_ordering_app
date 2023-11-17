import React from 'react'
import { RxCross2 } from "react-icons/rx";
import FeedbackDT from '../feedbackdynamictable/FeedBackDT';


const BubbleBox = ({ handleCut , columnItems , columnNames } : { handleCut : () => void , columnNames : string[] , columnItems : string[][] }) => {

  return (
    <div className='' style={{visibility : 'visible'}}>
        <div className='p-2' > 
            <button 
            onClick={() => {
                handleCut()
            }} > 
            <RxCross2 /> 
            </button> 
        </div>
        <FeedbackDT columnItems={columnItems} columnNames={columnNames} />

    </div>
  )
}

export default BubbleBox