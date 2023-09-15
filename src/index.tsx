import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { ChakraProvider, Box } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
// import dotenv from "dotenv"
// dotenv.config()

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
	<BrowserRouter>
		<ChakraProvider>
			<Box bg="#E3D887" minHeight="100vh" fontFamily={"Roboto Mono"}>
				<App />
			</Box>
		</ChakraProvider>
	</BrowserRouter>
)
