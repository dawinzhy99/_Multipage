import { useState } from "react"
import './count.css'


function Count(){
    const [value , setValue] = useState(0)
    
    const increment = (num) => {
      setValue(value + num);
       }

    const decrement = (num) => {
      setValue(value - num);
    }

    const clearButton = () => {
      setValue(0)
    }

return (
<>
  <div className="counter-container">
    <h1 className='text-2xl badge h-10' style={{textAlign: 'center'}}>Counter : {value}</h1>
        <div className="btn-container">
        <button className='btn btn-error m-2' onClick={() => decrement(1)}>-1</button>
        
        <button className="btn btn-success m-2" onClick={() => increment(1)}>+1</button>
        
        
        </div>
        
    </div>

  


   
   </>  
        )
    } 
export default Count 
