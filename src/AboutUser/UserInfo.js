import React, {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import classes from './UserInfo.module.css'
import scrollframework from '../Users/scrollframework'
import Loader from '../Loader/Loader'

const renderUser = (user) => (
	<div className={classes.UserInfo}>
		<img src={`${user.imageUrl}/${user.id}`} alt=""/>
		<div className={classes.leftInfo}>
			<div style={{
				marginBottom: '30px'
			}}>
				<p><strong>{user.name} {user.lastName}</strong></p>
				<p>{user.title}</p>
			</div>
			<p><strong>Email: </strong>{user.email}</p>
			<p><strong>Ip Address: </strong>{user.ip}</p>
			<p><strong>Ip Address: </strong>{user.ip}</p>
			<p><strong>Job Area: </strong>{user.jobArea}</p>
			<p><strong>Job Type: </strong>{user.jobType}</p>
		</div>

		{
			user.company &&

			<div className={classes.rigthInfo}>
				<p><strong>Address</strong></p>
				<p><strong>{user.company.suffix} {user.company.name}</strong></p>
				<p><strong>City: </strong>{user.address.city}</p>
				<p><strong>City: </strong>{user.address.country}</p>
				<p><strong>City: </strong>{user.address.state}</p>
				<p><strong>City: </strong>{user.address.streetAddres}</p>
				<p><strong>City: </strong>{user.address.zipCode}</p>

			</div>


		}
	</div>
)


const renderFriends = (friends, loading) => (

	<div className={classes.friends}>
		{friends.map((friend, index) => (
			<Link to={`/user/${friend.id}`} key={index}>
				<div style={{marginBottom: '10px'}}>
					<img src={`${friend.imageUrl}/${friend.id}`} alt=""/>
					<span>
        <p><strong>{friend.name}</strong></p>
        <p><strong>{friend.lastName}</strong></p>
        <p>{friend.title}</p>
      </span>
				</div>
			</Link>
		))}
		{loading && <Loader/>}
	</div>

)


const renderClickedFriendsHistory = (history) => (
	<div>
		{
			history.map((ClickedFriend, index) => (
				<Link
					style={{
						paddingRight: '10px'
					}}
					to={`/user/${ClickedFriend.id}`}
					key={index}
				>
					{ClickedFriend.name}
				</Link>

			))
		}

	</div>
)

export const UsersInfo = () => {
	const {id} = useParams()
	const [user, setUser] = useState({})
	const [userFriends, setuserFriends] = useState([])
	const [pagination, setPagination] = useState(null)
	const [loading, setLoading] = useState(false)
	const location = useLocation()
	const [history, setHistory] = useState([])

	useEffect(() => {
		setLoading(true)
		axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/1/20`)
			.then(response => response.data.pagination)
			.then(data => setPagination(data))
			.catch(e => console.log(e))
			.finally(() => setLoading(false))
	}, [])

	useEffect(() => {
		setLoading(true)
		axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`)
			.then(response => response.data)
			.then(data => {
				setUser(data)
			})
			.catch(e => console.log(e))
			.finally(() => setLoading(false))
	}, [location])


	useEffect(() => {
		setLoading(true)
		if (pagination && userFriends.length !== pagination.total) {

			axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${pagination.current}/${pagination.pageSize}`)
				.then(response => response.data.list)
				.then(data => setuserFriends(prev => [...prev, ...data]))
				.catch(e => console.log(e))
				.finally(() => setLoading(false))

		}
	}, [pagination])


	useEffect(() => {
		setLoading(true)
		if (pagination && userFriends.length !== pagination.total) {
			setHistory(prev => [...prev, user])
			setuserFriends([])
			axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${pagination.current}/${pagination.pageSize}`)
				.then(response => response.data.list)
				.then(data => setuserFriends(prev => [...prev, ...data]))
				.catch(e => console.log(e))
				.finally(() => setLoading(false))

		}
	}, [location])


	useEffect(() => {
		document.addEventListener('scroll', e => scrollframework(e, loading, setPagination))

		return () => {
			document.removeEventListener('scroll', scrollframework)
		}
	}, [])




	return (
		<div>

			{user && renderUser(user)}
			{history && renderClickedFriendsHistory(history)}
			{userFriends && renderFriends(userFriends, loading)}

		</div>
	)

}