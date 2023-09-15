import React from "react"
import { Card, CardBody, Text, Image, Stack } from "@chakra-ui/react"
import { IGameCard } from "../../models"
import classes from "./GameCard.module.css"
import { Link } from "react-router-dom"

interface GameCardProps {
	product: IGameCard
}

function GameCard({ product }: GameCardProps) {
	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		console.log(e.currentTarget, e.target)
	}

	let dataAtr = {
		"data-key": product.id,
	}

	return (
		<Card
			color={"#35447d"}
			bgColor={"#efefef"}
			key={product.id}
			{...dataAtr}
			className={classes.card}
			onClick={handleClick}
		>
			<Link to={"game/" + product.id}>
				<CardBody style={{ cursor: "pointer" }}>
					<Image src={product.thumbnail} borderRadius="lg" />
					<Stack mt="6" spacing="3">
						<Text color="#012E4A" fontSize="25px">
							{product.title}
						</Text>
						<Text>{product.publisher}</Text>
					</Stack>
				</CardBody>
			</Link>
		</Card>
	)
}

export default GameCard
