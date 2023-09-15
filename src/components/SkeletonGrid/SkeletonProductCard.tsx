import { Skeleton, Card, CardBody, Text, Stack } from "@chakra-ui/react"

function SkeletonProductCard() {
	return (
		<>
			<Card maxW="1500px">
				<CardBody>
					<Skeleton
						maxW="800px"
						height="200px"
						style={{ borderRadius: "10px" }}
					/>
					<Stack mt="6" spacing="3">
						<Text>
							<Skeleton height="25px" />
						</Text>
						<Text>
							<Skeleton height="25px" />
						</Text>
						<Text>
							<Skeleton height="25px" />
						</Text>
						<Text>
							<Skeleton height="25px" />
						</Text>
						<Text>
							<Skeleton height="25px" />
						</Text>
						<Text>
							<Skeleton height="25px" />
						</Text>
						<Skeleton
							maxW="400px"
							height="200px"
							style={{ borderRadius: "10px" }}
						/>
					</Stack>{" "}
				</CardBody>
			</Card>
		</>
	)
}

export default SkeletonProductCard
