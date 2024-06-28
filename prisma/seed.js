const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function seed() {
	const createdUsers = await prisma.user.createManyAndReturn({
		data: [
			{ username: "alice_m", email: "test1@test.db" },
			{ username: "alice_m2", email: "test2@test.db" },
		],
	})

    console.log(`${createdUsers.count} users created`, createdUsers)


	// Add your code here

	const createProfiles = await prisma.profile.createManyAndReturn({
		data: [
			{
                user_id: createdUsers[0].id,
				biography:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
				picture_url: "Curabitur condimentum hendrerit tristique",
			},
			{
                user_id: createdUsers[1].id,
				biography:
					"Aliquam eleifend, mi id ullamcorper laoreet, tellus lorem dapibus erat, ac vehicula diam nulla a turpis",
				picture_url: "Mauris tempus lectus ac magna mollis eleifend",
			},
		],
	})

	// Don't edit any of the code below this line
	process.exit(0)
}

seed().catch(async (error) => {
	console.error(error)
	await prisma.$disconnect()
	process.exit(1)
})
