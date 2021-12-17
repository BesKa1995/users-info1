import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import classes from './AboutUser.module.css'
import UserFriends from './UserFriends'


export default function AboutUser() {


  const {id} = useParams()
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`)
      .then(res => res.data)
      .then(data => setUser(data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))


  }, [])

  return (
    <div style={{
      backgroundColor: '#aaa'
    }}>
      {!loading && renderUserInfo(user)}
      <div style={{

        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'space-between'
      }}>
        <UserFriends userId={id}/>

      </div>
    </div>
  )
}


const renderUserInfo = (user) => (


  <div className={classes.header}>
    <img src={`${user.imageUrl}/${user.id}`} alt=""/>
    <div className={classes.leftInfo}>
      <p><strong>{user.prefix} {user.name} {user.lastName}</strong></p>
      <p>Email: {user.email}</p>
      <p>Ip: {user.ip}</p>
      <p>Ip: {user.ip}</p>
      <p>Job Area: {user.jobArea}</p>
      <p>Job Type: {user.jobType}</p>
    </div>
    <div className={classes.rigthInfo}>
      <h3 style={{
        margin: '10px',
        height: 'fit-content',
        width: 'fit-content',
        background: 'rgba(0,0,0,.5)',
        padding: '10px 15px',
        borderRadius: '5px',
        boxShadow: '2px 2px 5px rgba(0,0,0,.25)',
        position: 'relative',
        left: '30%'
      }}>Address</h3>
      <p style={{lineHeight: '1rem'}}><strong>{user.company.name}</strong></p>
      <p>Country: {user.address.country}</p>
      <p>City: {user.address.city}</p>
      <p>State: {user.address.state}</p>
      <p>Street Address:{user.address.streetAddress}</p>
      <p>ZIP:{user.address.zipCode}</p>
    </div>
  </div>


)