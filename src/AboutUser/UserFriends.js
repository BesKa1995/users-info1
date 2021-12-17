import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {CreateUsersFriend} from './CreateUsersFriend'

export default function UserFriends(props) {
  const [usersFrineds, setUsersFriends] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)


  function scrollHandler(e) {


      }


  useEffect(() => {
    setLoading(true)
    axios.get('http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/1/friends/1/20')
      .then(res => res.data.pagination)
      .then(pagination => setPagination(pagination))
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false)

      })
    document.addEventListener('scroll', scrollHandler)

  }, [])

  useEffect(() => {
    setLoading(true)
    if (pagination && (pagination.current * pagination.pageSize) !== pagination.total) {

      axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${props.userId}/friends/${pagination.current}/${pagination.pageSize}`)
        .then(response => response.data.list)
        .then(data => {
          setUsersFriends(prev => [...prev, ...data])
        })
        .catch(e => console.log(e))
        .finally(() => {
          setLoading(false)
          console.log(usersFrineds)
        })

    }

  }, [pagination])

  console.log(loading)
  return (
    !loading && renderUsersFriends(usersFrineds)
  )
}


const renderUsersFriends = (friends) => (
  <>
    {friends.map((friend, index) => (
      <CreateUsersFriend
        key={index}
        name={friend.name}
        lastName={friend.lastName}
        title={friend.title}
        id={friend.id}
        imgUrl={`${friend.imageUrl}/${friend.id}`}
      />
    ))}
  </>
)

