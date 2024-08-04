import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom"
import "../../styles/home.css";

export const Home = () => {

	const { store, actions } = useContext(Context)
	const [activeBtn, setActiveBtn] = useState(false)

	// useEffect(()=>{
	// 	actions.loadCharacterData()
	// 	actions.loadPlanetsData()
	// }, [])

	const characters = store.characters.map(char =>
		<div key={char.uid} className="card col-3">
			<img src={`https://starwars-visualguide.com/assets/img/characters/${char.uid}.jpg`} className="card-img-top" alt="..." />
			<div className="card-body">
				<h5 className="	 d-flex">{char.properties.name}</h5>

				<p className="d-flex justify-content-start m-0">Gender: {char.properties.gender}</p>
				<p className="d-flex justify-content-start m-0">Hair Color: {char.properties.hair_color}</p>
				<p className="d-flex justify-content-start ">Eye Color: {char.properties.eye_color}</p>

				<div className="d-flex justify-content-between">
					<Link to={`character/${char.uid}`} className="btn btn-primary">Learn More!</Link>

					<button className="btn btn-dark" onClick={() => actions.addFavorite(char)}>

						<FontAwesomeIcon className={(store.favorites.find(item => char.uid == item.uid ) ? "text-warning" : "text-light")} icon={faHeart} />

					</button>
				</div>
			</div>
		</div>
	)

	const planets = store.planets.map(planet =>
		<div key={planet.uid} className="card col-3">
			<img src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`} className="card-img-top" alt="..." />
			<div className="card-body">
				<h5 className="d-flex">{planet.properties.name}</h5>

				<p className="d-flex justify-content-start m-0">Population: {planet.properties.population}</p>
				<p className="d-flex justify-content-start">Terrain: {planet.properties.terrain}</p>


				<div className="d-flex justify-content-between">
					<Link to={`planets/${planet.uid}`} className="btn btn-primary">Learn More!</Link>

					<button className="btn bg-dark" onClick={() => actions.addFavorite(planet)}>

						<FontAwesomeIcon className={(store.favorites.find(item => planet.uid == item.uid ) ? "text-warning" : "text-light")} icon={faHeart} />

					</button>

				</div>

			</div>
		</div >
	)

	return <>
		<div className="container">
			<h1 className="mb-4 text-danger">Characters</h1>
			<div className="text-center d-flex flex-column">

				<div className="scroll d-flex justify-content-center gap-1 mx-auto" style={{ maxWidth: "90vw" }}>
					{characters}
				</div>
			</div>
		</div>

		<div className="container">
			<h1 className="my-4 text-danger">Planets</h1>
			<div className="text-center d-flex flex-column">

				<div className="scroll d-flex justify-content-center gap-1 mx-auto" style={{ maxWidth: "90vw" }}>
					{planets}
				</div>
			</div>
		</div>
	</>
};

