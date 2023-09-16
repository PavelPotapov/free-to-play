import { useState, useEffect, useReducer } from "react"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import axios, { AxiosError } from "axios"
import { IGameCard } from "./models"
import { getUniqueGenres, getUniquePlatforms } from "./utils/utils"
import { Routes, Route } from "react-router-dom"
import Main from "./components/Pages/Main"
import Notfoundpage from "./components/Pages/Notfoundpage"
import ProductCard from "./components/Pages/ProductCard/ProductCard"
import { Context } from "./context"
import { reducer } from "./reducer"
import { Box } from "@chakra-ui/react"
import { ErrorLoading, ParamReq } from "./models"
import { platform } from "os"

function App() {
	//текущие карточки игр
	const [cards, setCards] = useState<IGameCard[]>([])
	//идет ли загрузка
	const [isLoading, setIsLoading] = useState(true)
	//жанры игр
	const [genres, setGenres] = useState<String[]>([])
	//платформы
	// const [platforms, setPlatforms] = useState<String[]>([])
	//если не будет игр по заданным параметрам
	const [error, setError] = useState<ErrorLoading>({ status: false, text: "" })

	const [state, dispatchFilter] = useReducer(reducer, {
		platform: "",
		category: "",
		sort_by: "",
	})

	//при работе с развернутым сервером
	async function fetchCards() {
		try {
			const responce = await axios.get<IGameCard[]>(
				"http://127.0.0.1:5000/cards"
			)
			if (responce.status === 200) {
				setIsLoading(false)
				if (responce.data.length > 0) {
					setCards(responce.data)
					let res = getUniqueGenres(responce.data)
					setGenres([...res])
					setError({
						status: false,
						text: "",
					})
					//можно искать все уникальные платформы, но там их всего две + их названия не подходят для запросов к API, так что пока без этого функционала
					//res = getUniquePlatforms(responce.data)
					//setPlatforms([...res])
				}
			}
			return responce.data
		} catch (error) {
			const axiosEroor = error as AxiosError
			setError({
				status: true,
				text: axiosEroor.message,
			})
		}
	}
	async function fetchCardsByFilter() {
		try {
			setIsLoading(true)
			const responce = await axios.get("http://127.0.0.1:5000/filter", {
				params: {
					genre: state.category,
					platform: state.platform,
					"sort-by": state.sort_by,
				},
			})
			if (responce.status === 200) {
				setIsLoading(false)
				if (responce.data.length > 0) {
					setCards(responce.data)
					setError({
						status: false,
						text: "",
					})
				} else if (responce.data.status === 0) {
					setError({
						status: true,
						text: responce.data.status_message,
					})
				} else {
					setError({
						status: true,
						text: "Ой, что-то пошло не так, попробуйте позже",
					})
				}
			}
			return responce.data
		} catch (error) {
			const axiosError = error as AxiosError
			setError({
				status: true,
				text: axiosError.message,
			})
		}
	}

	//без своего сервера сервера
	async function fetchCardsByFilterV2() {
		const paramsReq: ParamReq = {}
		if (state.platform) {
			paramsReq["platform"] = state.platform
		}
		if (state.category) {
			paramsReq["category"] = state.category
		}
		if (state.sort_by) {
			paramsReq["sort-by"] = state.sort_by
		}
		const options = {
			method: "GET",
			url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
			params: {
				...paramsReq,
			},
			headers: {
				"X-RapidAPI-Key": "4db9dea879msh187c273225b8a1dp1d905bjsnbd001452f767",
				"X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
			},
		}
		try {
			setIsLoading(true)
			const responce = await axios.request(options)

			if (responce.status === 200) {
				setIsLoading(false)
				if (responce.data.length > 0) {
					setCards(responce.data)
					setError({
						status: false,
						text: "",
					})
				} else if (responce.data.status === 0) {
					setError({
						status: true,
						text: responce.data.status_message,
					})
				} else {
					setError({
						status: true,
						text: "Ой, что-то пошло не так, попробуйте позже",
					})
				}
			}
			return responce.data
		} catch (error) {
			const axiosError = error as AxiosError
			setError({
				status: true,
				text: "Нет данных с выбранной категорией",
			})
		}
	}
	async function fetchCardsV2() {
		const options = {
			method: "GET",
			url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
			headers: {
				"X-RapidAPI-Key": "4db9dea879msh187c273225b8a1dp1d905bjsnbd001452f767",
				"X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
			},
		}
		console.log(
			process.env.REACT_APP_X_KEY,
			process.env.REACT_APP_X_HOST,
			"!!!!!"
		)
		try {
			const responce = await axios.request<IGameCard[]>(options)
			console.log(responce)
			if (responce.status === 200) {
				setIsLoading(false)
				if (responce.data.length > 0) {
					setCards(responce.data)
					let res = getUniqueGenres(responce.data)
					setGenres([...res])
					setError({
						status: false,
						text: "",
					})
				}
			}
		} catch (error) {
			console.log(error)
			const axiosEroor = error as AxiosError
			setError({
				status: true,
				text: axiosEroor.message,
			})
		}
	}

	useEffect(() => {
		fetchCards()
	}, [])

	useEffect(() => {
		/* https://www.freetogame.com/api/games?platform=browser&category=mmorpg&sort-by=release-date */
		if (state.platform || state.sort_by || state.category) {
			fetchCardsByFilter()
		} else {
			fetchCards()
		}
	}, [state])

	useEffect(() => {}, [cards])

	return (
		<>
			<Context.Provider
				value={{
					dispatchFilter,
				}}
			>
				<div className="App">
					<Header />
					<Box maxWidth={"1400px"} margin={"0 auto"}>
						<main>
							<Routes>
								<Route
									path="/"
									element={
										<Main
											cards={cards}
											isLoading={isLoading}
											genres={genres}
											plarforms={["pc", "browser"]}
											sort_by={["release date", "alphabetical", "relevance"]}
											state={state}
											error={error}
										/>
									}
								/>
								<Route path="/:game/:id" element={<ProductCard />} />
								<Route path="*" element={<Notfoundpage />} />
							</Routes>
						</main>
					</Box>
					<Footer />
				</div>
			</Context.Provider>
		</>
	)
}

export default App
