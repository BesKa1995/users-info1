import React from 'react'
import classes from './CreateUser.module.css'
import {Link} from 'react-router-dom'

function CreateUser(props) {

	const renderUser = () => (
		<Link
			to={`user/${props.id}`}
			style={{textDecoration: 'none'}}
		>
			<div className={classes.CreateUser}>
				<img src={props.imageUrl} alt=""/>
				<span>
        <p><strong>{props.name}</strong></p>
        <p><strong>{props.lastName}</strong></p>
        <p>{props.title}</p>
      </span>
			</div>
		</Link>
	)

	return (
		renderUser()
	)
}


export default CreateUser