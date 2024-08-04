import { parse, stringify } from "query-string";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],

			characters: JSON.parse(localStorage.getItem("characters")) || [],

			planets: JSON.parse(localStorage.getItem("planets")) || [],


			favorites: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadCharacterData: async () => {
				let store = getStore()

				if (store.characters <= 0) {
					try {
						const res = await fetch("https://www.swapi.tech/api/people/")
						const data = await res.json()

						for (let response of data.results) {
							const result = await fetch(response.url)
							const dataTwo = await result.json()
							setStore({
								characters: [...store.characters, dataTwo.result]
							})
						}

						localStorage.setItem("characters", JSON.stringify(store.characters))

					} catch (error) {
						console.log(error)
					}
				}



			},

			loadPlanetsData: async () => {
				let store = getStore()

				if (store.planets <= 0) {
					try {
						const res = await fetch("https://www.swapi.tech/api/planets/")
						const data = await res.json()

						for (let response of data.results) {
							const result = await fetch(response.url)
							const dataTwo = await result.json()

							setStore({
								planets: [...store.planets, dataTwo.result]
							})
						}

						localStorage.setItem("planets", JSON.stringify(store.planets))

					} catch (error) {
						console.log(error)
					}
				}
			},


			addFavorite: (fav) => {
				let store = getStore()

				let exist = store.favorites.some((item) => fav._id == item._id)

				if (exist) {
					//eliminar de favorite
					let newFav = store.favorites.filter((item) => fav._id != item._id)
					setStore({
						favorites: newFav
					})
				} else {
					setStore({
						favorites: [...store.favorites, fav]
					})
				}


				

				// const store = getStore();

				// const charFavorite = store.characters.find((char,) => {
				// 	return char.uid === index
				// })

				// const planetFavorite = store.planets.find((planet,) => {
				// 	return planet.uid === index
				// })

				// const alreadyFavorite = store.favorites.find((element) => {
				// 	return charFavorite === element
				// })

				// if (!alreadyFavorite) {
				// 	setStore({ favorites: [...store.favorites, charFavorite,] })
				// }

			},


			deleteFavorite: (index) => {

				const store = getStore();
				const newFavorites = store.favorites.filter((char) => {
					return char.uid !== index
				})
				setStore({ favorites: newFavorites })
			},












			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

		}
	};
};

export default getState;
