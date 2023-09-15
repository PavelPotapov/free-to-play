import { Skeleton, Card, CardBody, Text, Stack } from "@chakra-ui/react"

function SkeletonGrid() {
	return (
		<>
			{[...Array(150)].map((el, index) => (
				<Card key={index}>
					<CardBody>
						<Skeleton height="100px" style={{ borderRadius: "10px" }} />
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
						</Stack>
					</CardBody>
				</Card>
			))}
		</>
	)
}

export default SkeletonGrid
