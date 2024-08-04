import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";


export const Navbar = () => {
	const { store, actions } = useContext(Context)

	return (
		<nav className="navbar navbar-light bg-light mb-3 container-fluid py-2">
			<Link to="/">
				<img className="alto mx-5 px-5" src="https://cdn.freebiesupply.com/logos/large/2x/star-wars-logo-png-transparent.png" alt="" />
			</Link>
			<div className="ml-auto">
				<div className="dropdown mx-5 px-5">
					<button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
						Favorites: <span>{store.favorites.length}</span>
					</button>

					<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
						{store.favorites.length === 0 && <li key={0}><div className="dropdown-item">No favorites</div></li>}
						{
							store.favorites.map((item) => {
								return (
									<li key={item.uid} className="d-flex justify-content-between" style={{ width: "250px" }}>
										<span className="dropdown-item">{item.properties.name}</span>
										<span className="dropdown-item btn" onClick={() => actions.deleteFavorite(item.uid)}>🗑️</span>
									</li>
								)
							})
						}
					</ul>
				</div>
			</div>
		</nav>
	);
};
