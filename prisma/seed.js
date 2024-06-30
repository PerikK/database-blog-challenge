const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function seed() {
	const createdUsers = await prisma.user.createManyAndReturn({
		data: [
			{ username: "alice_m", email: "test1@test.db" },
			{ username: "joan", email: "test2@test.db" },
			{ username: "John_Doe", email: "jd@test.db" },
		],
	})

	console.log(`${createdUsers.count} users created`, createdUsers)

	// Add your code here

	const createProfiles = await prisma.profile.createManyAndReturn({
		data: [
			{
				user_id: createdUsers[0].id,
				full_name: "Alice Modalban",
				biography:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
				picture_url: "Curabitur condimentum hendrerit tristique",
			},
			{
				user_id: createdUsers[1].id,
				full_name: "Alice Doe",
				biography:
					"Aliquam eleifend, mi id ullamcorper laoreet, tellus lorem dapibus erat, ac vehicula diam nulla a turpis",
				picture_url: "Mauris tempus lectus ac magna mollis eleifend",
			},
			{
				user_id: createdUsers[2].id,
				full_name: "John Doe",
				biography:
					"Lorem ipsum dolor sit amet, tellus lorem dapibus erat, ac vehicula diam nulla a turpis",
				picture_url: "Curabitur condimentum ac magna mollis eleifend",
			},
		],
	})


	const createPosts = await prisma.post.createManyAndReturn({
		data: [
			{
				user_id: createdUsers[0].id,
				title: "A post's title",
				content: "A post's content",
				picture_url: "http://a_fake_image_repository.com/1",
			},
			{
				user_id: createdUsers[1].id,
				title: "Another post's title",
				content: "Another post's content",
				picture_url: "http://a_fake_image_repository.com/2",
			},
			{
				user_id: createdUsers[2].id,
				title: "A third post's title",
				content: "A third post's content",
				picture_url: "http://a_fake_image_repository.com/3",
			},
			{
				user_id: createdUsers[0].id,
				title: "Alice's 2nd post",
				content: "Alice's 2nd post content",
				picture_url: "http://a_fake_image_repository.com/1",
			},
			{
				user_id: createdUsers[1].id,
				title: "Joan's 2nd post",
				content: "Joan's 2nd post post's content",
				picture_url: "http://a_fake_image_repository.com/2",
			},
			{
				user_id: createdUsers[2].id,
				title: "John's 2nd post",
				content: "John's 2nd post content",
				picture_url: "http://a_fake_image_repository.com/3",
			},
		],
	})
	// console.log(createPosts);

	const createComments = await prisma.comment.createManyAndReturn({
		data: [
			{
				user_id: createdUsers[0].id,
				post_id: createPosts[1].id,
				content: "Alice's comment on Joan's post",
			},
			{
				user_id: createdUsers[1].id,
				post_id: createPosts[2].id,
				content: "Joan's comment on John's post",
			},
			{
				user_id: createdUsers[2].id,
				post_id: createPosts[0].id,
				content: "John's comment on Alice's post",
			},
		],
	})

	const replyToFirstComment = await prisma.comment.create({
		data: {
			user_id: createdUsers[2].id,
			post_id: createPosts[1].id,
			self_ref_id: createComments[0].id,
			content: "John's reply on Alice's comment on Joan's post"
		}
	})

	console.log(replyToFirstComment)



	// Don't edit any of the code below this line
	process.exit(0)
}

seed().catch(async (error) => {
	console.error(error)
	await prisma.$disconnect()
	process.exit(1)
})
