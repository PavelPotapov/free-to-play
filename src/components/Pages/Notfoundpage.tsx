import { Link } from "react-router-dom"

function Notfoundpage() {
	return (
		<div>
			Страница не найдена, перейдите на{" "}
			<strong>
				<Link to="/">главную</Link>
			</strong>
		</div>
	)
}

export default Notfoundpage
