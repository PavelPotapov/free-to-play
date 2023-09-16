import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { IProductCard } from "../../../models"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-cards"
import { EffectCards } from "swiper/modules"
import classes from "./ProductCard.module.css"
import SystemRequired from "./SystemRequired"
import SkeletonProductCard from "../../SkeletonGrid/SkeletonProductCard"
import {
	Card,
	CardBody,
	Flex,
	Stack,
	Heading,
	Text,
	Image,
	Button,
} from "@chakra-ui/react"

import { ArrowBackIcon } from "@chakra-ui/icons"

function ProductCard() {
	const { id } = useParams()
	const [isLoading, setIsLoading] = useState(true)
	const [cardData, setCardData] = useState<IProductCard>()
	const [error, setError] = useState({ status: false, text: "" })

	//со своим сервером
	async function fetchCard(id: any) {
		try {
			const responce = await axios.get<IProductCard>(
				"http://127.0.0.1:5000/card",
				{ params: { id: id } }
			)
			if (responce.status === 200) {
				setIsLoading(false)
				if (responce.data?.status === 0) {
					setError({ status: true, text: "Нет игры с таким id" })
				} else {
					setCardData(responce.data)
					setError({ status: false, text: "" })
				}
			} else {
				setError({
					status: true,
					text: "Ой, что-то пошло не так, попробуйте позже",
				})
			}
		} catch (error: any) {
			setError({
				status: true,
				text: "Ой, что-то пошло не так, попробуйте позже",
			})
		}
	}

	//без своего сервера
	async function fetchCardV2(id: any) {
		const options = {
			method: "GET",
			url: "https://free-to-play-games-database.p.rapidapi.com/api/game",
			params: { id: id },
			headers: {
				"X-RapidAPI-Key": "4db9dea879msh187c273225b8a1dp1d905bjsnbd001452f767",
				"X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
			},
		}
		try {
			const responce = await axios.request<IProductCard>(options)
			if (responce.status === 200) {
				setIsLoading(false)
				if (responce.data?.status === 0) {
					setError({ status: true, text: "Нет игры с таким id" })
				} else {
					setCardData(responce.data)
					setError({ status: false, text: "" })
				}
			} else {
				setError({
					status: true,
					text: "Ой, что-то пошло не так, попробуйте позже",
				})
			}
		} catch (error: any) {
			setError({
				status: true,
				text: "Ой, что-то пошло не так, попробуйте позже",
			})
		}
	}

	useEffect(() => {
		fetchCard(id)
	}, [])

	return (
		<div>
			<div>
				<Link to="/">
					<Button
						marginBottom="5px"
						size="sm"
						_hover={{ backgroundColor: "#6ab0ba", color: "#efefef" }}
						padding={"5px 5px 5px 0px"}
						width={"50px"}
					>
						<ArrowBackIcon boxSize={8} />{" "}
					</Button>
				</Link>
			</div>
			{error.status && error.text}
			{isLoading && !error.status && <SkeletonProductCard />}
			{!isLoading && !error.status && (
				<>
					<Card maxW="1500px" overflow={"hidden"}>
						<CardBody>
							<Stack>
								<>
									<Heading size="md">{cardData?.title}</Heading>
									<Flex gap={"20px"} wrap={"wrap"}>
										<Image
											objectFit="cover"
											src={cardData?.thumbnail}
											alt="Logo"
											style={{ borderRadius: "10px", width: "450px" }}
										/>
										<Flex gap={"10px"} direction={"column"}>
											{cardData?.minimum_system_requirements?.graphics && (
												<SystemRequired
													SystemData={cardData?.minimum_system_requirements}
												/>
											)}
										</Flex>
									</Flex>
								</>

								<Text>
									<a href={cardData?.game_url}>Официальный сайт</a>
								</Text>
								<Text>Разработчик: {cardData?.developer}</Text>
								<Text>Жанр: {cardData?.genre}</Text>
								<Text>{cardData?.short_description}</Text>

								<Text>Дата релиза: {cardData?.release_date}</Text>
								<Text>Платформа: {cardData?.platform}</Text>
								<Text align={"left"}>
									{cardData?.screenshots && (
										<Swiper
											effect={"cards"}
											grabCursor={true}
											modules={[EffectCards]}
											className={classes.mySwiper}
										>
											{cardData.screenshots.map((el) => (
												<SwiperSlide>
													<Image
														objectFit="cover"
														src={el.image}
														style={{ borderRadius: "10px", width: "500px" }}
														onLoad={() => {
															console.log("Загрузилась")
														}}
													/>
												</SwiperSlide>
											))}
										</Swiper>
									)}
								</Text>
							</Stack>
						</CardBody>
					</Card>
				</>
			)}
		</div>
	)
}

export default ProductCard
