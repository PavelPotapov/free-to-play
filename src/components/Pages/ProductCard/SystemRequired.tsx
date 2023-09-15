import React from "react"
import { ISystemReq } from "../../../models"
import { Text, UnorderedList, ListItem } from "@chakra-ui/react"

interface SystemRequiredProps {
	SystemData: ISystemReq
}

function SystemRequired({ SystemData }: SystemRequiredProps) {
	return (
		<div>
			<Text>Минимальные системные требования </Text>
			<UnorderedList>
				<ListItem>{SystemData?.graphics}</ListItem>
				<ListItem>{SystemData?.memory}</ListItem>
				<ListItem>{SystemData?.os}</ListItem>
				<ListItem>{SystemData?.processor}</ListItem>
				<ListItem>{SystemData?.storage}</ListItem>
			</UnorderedList>
		</div>
	)
}

export default SystemRequired
