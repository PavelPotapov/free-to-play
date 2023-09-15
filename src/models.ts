export interface IGameCard {
	id: number
	title: string
	thumbnail: string
	short_description: string
	game_url: string
	genre: string
	platform: string
	publisher: string
	developer: string
	release_date: string
	freetogame_profile_url: string
}

export interface ErrorLoading {
	status: boolean
	text: string
}

export interface EnumServiceItem {
	id: number
	image: string
}

export interface ISystemReq {
	graphics: string
	memory: string
	os: string
	processor: string
	storage: string
}

export interface IProductCard {
	description: string
	developer: string
	freetogame_profile_url: string
	game_url: string
	genre: string
	id: number
	minimum_system_requirements: ISystemReq
	platform: string
	publisher: string
	release_date: string
	screenshots: EnumServiceItem[]

	short_description: string
	status: string | number
	thumbnail: string
	title: string
}

export type GlobalState = {
	platform: string
	category: string
	sort_by: string
}

export type ReducerAction = {
	type: string
	payload: string
}

export type ParamReq = {
	platform?: string
	category?: string
	"sort-by"?: string
}
