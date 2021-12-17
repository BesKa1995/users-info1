import React, {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import classes from './Users.module.css'
import CreateUser from './CreateUser'
import Loader from '../Loader/Loader'

function Users() {


  const [usersList, setUserList] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(false)

  function scrollHandler(e) {

    if (!loading) {

      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        setPagination(prev => {
          return {...prev, current: prev.current + 1, nextPage: prev.nextPage + 1}
        })


      }
    }

  }

  useEffect(() => {
    axios.get('http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/1/20')
      .then(res => res.data.pagination)
      .then(pagination => setPagination(pagination))
      .catch(e => console.log(e))

    document.addEventListener('scroll', scrollHandler)


    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    if (pagination && (pagination.current * pagination.pageSize) !== pagination.total) {

      axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${pagination.current}/${pagination.pageSize}`)
        .then(response => response.data.list)
        .then(data => {
          setUserList(prev => [...prev, ...data])
        })
        .catch(e => console.log(e))
        .finally(() => {
          setLoading(false)
        })

    }

  }, [pagination])
  return (
    <>


      {

        <div className={classes.Users}>
        {usersList.map((user, index) => (
          <CreateUser
            key={index}
            id={user.id}
            name={user.name}
            lastName={user.lastName}
            title={user.title}
            imageUrl={`${user.imageUrl}/${user.id}`}
          />
        ))}
        {loading && <Loader/>}
        </div>
      }
    </>

  )
}

export default Users