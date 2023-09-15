import React, { useContext, ChangeEvent, useEffect, MouseEvent } from "react"
import { Select, Flex, Button } from "@chakra-ui/react"

import { RepeatIcon } from "@chakra-ui/icons"
import classes from "./Filter.module.css"
import { platform } from "os"
import { Context } from "../../context"
import { GlobalState } from "../../models"

interface FilterProp {
	genres: String[]
	pratforms: String[]
	sort_by: String[]
	state: GlobalState
}

function Filter({ genres, pratforms, sort_by, state }: FilterProp) {
	const { dispatchFilter } = useContext(Context)

	useEffect(() => {}, [])
	useEffect(() => {}, [])

	const handleGenreClick = (event: ChangeEvent<HTMLSelectElement>) => {
		dispatchFilter({
			type: "genres",
			payload: event.target.value.split(" ")[0],
		})
	}

	const handlePlatformClick = (event: ChangeEvent<HTMLSelectElement>) => {
		dispatchFilter({
			type: "platform",
			payload: event.target.value,
		})
	}

	const handleSortClick = (event: ChangeEvent<HTMLSelectElement>) => {
		dispatchFilter({
			type: "sort",
			payload: event.target.value,
		})
	}

	const handleResetClick = (event: MouseEvent<HTMLButtonElement>) => {
		dispatchFilter({
			type: "reset",
			payload: "",
		})
	}

	return (
		<div className={classes.filterContainer}>
			<Button
				marginBottom="5px"
				size="sm"
				_hover={{ backgroundColor: "#6ab0ba", color: "#efefef" }}
				onClick={handleResetClick}
			>
				<RepeatIcon />
				&nbsp;Сбросить фильтры
			</Button>

			<Flex className={classes.filterContainer__inner} gap={"5px"}>
				<Select
					bg="#efefef"
					placeholder="Все жанры"
					size="sm"
					onChange={handleGenreClick}
					value={state.category}
					borderRadius={"5px"}
					focusBorderColor="#6ab0ba"
				>
					{genres.map((el, index) => (
						<option key={index}>{el}</option>
					))}
				</Select>
				<Select
					bg="#efefef"
					placeholder="Все платформы"
					size="sm"
					onChange={handlePlatformClick}
					value={state.platform}
					borderRadius={"5px"}
					focusBorderColor="#6ab0ba"
				>
					{pratforms.map((el, index) => (
						<option key={index}>{el}</option>
					))}
				</Select>
				<Select
					bg="#efefef"
					placeholder="Сортировка по"
					size="sm"
					onChange={handleSortClick}
					value={state.sort_by}
					borderRadius={"5px"}
					focusBorderColor="#6ab0ba"
				>
					{sort_by.map((el, index) => (
						<option key={index}>{el}</option>
					))}
				</Select>
			</Flex>
		</div>
	)
}

export default Filter
