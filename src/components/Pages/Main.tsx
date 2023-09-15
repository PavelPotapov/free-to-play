import { SimpleGrid, Box } from "@chakra-ui/react"
import SkeletonGrid from "../SkeletonGrid/SkeletonGrid"
import { IGameCard, GlobalState, ErrorLoading } from "../../models"
import GameCard from "../GameCard/GameCard"
import Filter from "../Filter/Filter"

interface MainProps {
	cards: IGameCard[]
	isLoading: boolean
	genres: String[]
	plarforms: String[]
	sort_by: String[]
	error: ErrorLoading
	state: GlobalState
}

function Main({
	cards,
	isLoading,
	genres,
	plarforms,
	sort_by,
	state,
	error,
}: MainProps) {
	return (
		<div>
			<Filter
				genres={genres}
				pratforms={plarforms}
				sort_by={sort_by}
				state={state}
			/>

			<SimpleGrid
				// margin={"0 auto"}
				maxWidth={"80vw"}
				spacing={4}
				templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
			>
				{error.status && error.text}
				{isLoading && !error.status && <SkeletonGrid />}
				{!isLoading &&
					!error.status &&
					cards.map((card) => <GameCard product={card} key={card.id} />)}
			</SimpleGrid>
		</div>
	)
}

export default Main
