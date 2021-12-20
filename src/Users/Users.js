import React, {useEffect, useState} from 'react'
import axios from 'axios'
import classes from './Users.module.css'
import CreateUser from './CreateUser'
import Loader from '../Loader/Loader'
import scrollHandler from './scrollframework'

function Users() {


	const [usersList, setUserList] = useState([])
	const [pagination, setPagination] = useState(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		axios.get('http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/1/20')
			.then(res => res.data.pagination)
			.then(pagination => setPagination(pagination))
			.catch(e => console.log(e))
			.finally(() => setLoading(false))
	}, [])


	useEffect(() => {
		document.addEventListener('scroll', (e) => scrollHandler(e, loading, setPagination))
		return () => {
			document.removeEventListener('scroll', scrollHandler)
		}
	}, [])


	useEffect(() => {
		setLoading(true)
		if (pagination && (usersList.length) < pagination.total) {

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