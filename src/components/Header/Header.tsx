import React from "react"
import { Text, Box } from "@chakra-ui/react"
import { Link } from "react-router-dom"

function Header() {
	return (
		<>
			<Link to="/">
				<Box
					_hover={{ color: "#35447d", cursor: "pointer" }}
					color={"#efefef"}
					bgColor={"#968B43"}
					height={"180px"}
					marginBottom={"10px"}
				>
					<Text
						textAlign={"center"}
						fontSize="8xl"
						style={{ marginBottom: "30px", marginLeft: "10px" }}
					>
						Free to Play
					</Text>
				</Box>
			</Link>
		</>
	)
}

export default Header
