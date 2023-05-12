import React from 'react'

function FlexBetween({children , style , className}) {
  return (
    <div className= {`flex justify-between items-center ${className}`} style={style} >
        {children}
      
    </div>
  )
}

export default FlexBetween
