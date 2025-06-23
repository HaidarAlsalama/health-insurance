import React from 'react'
import { NavLink } from 'react-router-dom'

const Quiries = (props) => {
  return (
 <>
   <div className=" mr-2  ml-7 mb-2 md:mr-2 mt-3">
        <NavLink to={props.link} className="text-slate-600 underline ">
          {props.title}
        </NavLink>
      </div>
 </>
  )
}

export default Quiries