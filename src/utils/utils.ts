export function getUniqueGenres(arr: any) {
	let res: String[] = []
	for (let i of arr) {
		if (!res.includes(i.genre)) {
			res.push(i.genre)
		}
	}
	return res
}

export function getUniquePlatforms(arr: any) {
	let res: String[] = []
	for (let i of arr) {
		if (!res.includes(i.platform)) {
			res.push(i.platform)
		}
	}
	return res
}
