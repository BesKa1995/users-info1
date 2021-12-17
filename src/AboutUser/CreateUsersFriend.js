import React from 'react'
import {Link} from 'react-router-dom'


export const CreateUsersFriend = (props) => {

  return (
    <div style={{

      borderRadius: '5px',
      padding: '10px',
      margin: '20px',
    }}>
        <img style={{
          height: '200px',
          borderRadius: '5px',
        }} src={`${props.imgUrl}`} alt=""/>
        <p><strong>{props.name} {props.lastName}</strong></p>
        <p>{props.title}</p>
    </div>
  )
}