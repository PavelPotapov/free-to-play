import { GlobalState, ReducerAction } from "./models"

export function reducer(state: GlobalState, action: ReducerAction) {
	switch (action.type) {
		case "platform": {
			return {
				platform: action.payload,
				category: state.category,
				sort_by: state.sort_by,
			}
		}
		case "genres": {
			return {
				category: action.payload,
				platform: state.platform,
				sort_by: state.sort_by,
			}
		}
		case "sort": {
			return {
				sort_by: action.payload,
				category: state.category,
				platform: state.platform,
			}
		}

		case "reset": {
			return {
				sort_by: "",
				category: "",
				platform: "",
			}
		}
		default:
			return {
				...state,
			}
	}
}
