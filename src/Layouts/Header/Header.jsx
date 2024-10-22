import React from 'react'
import './Header.css'

function Header({setToken}) {
  return (
    <div className='text-3xl '>
      <span className='text-3xl btn btn-disabled btn-neutral text-black mb-2'>
        CSI205
        </span>
        <span> FRONT-END SOFTWARE DEVELOPER </span>
        <span style={{float:"right"}}>
          <button className="btn btn-error " onClick={() => setToken("")}>
            Logout
          </button>
          </span>
    </div>
  )
}

export default Header
