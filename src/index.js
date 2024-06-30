const prismaClient = require("./db.js")

const getAllUsers = async () => {
	const allUsers = await prismaClient.user.findMany()
	return allUsers
}

const getPostsByUserId = async () => {
	const post = await prismaClient.post.findMany({
		where: {
			user_id: 2,
		},
	})
    return post
}

const getUserAndProfileById = async () => {
    const userWithProfile = await prismaClient.user.findUnique({
        where: {
            id: 1
        },
        include: {
            profile: true
        }
    })
    return userWithProfile
}

const updatePost = async () => {
	const postUpdate = await prismaClient.post.update({
		where: {
			id: 1,
		},
		data: {
			content: "Different than the original post content",
		},
	})
	return postUpdate
}

const deletePostById = async () => {
    const deletePost = await prismaClient.post.delete({
        where: {
            id: 3
        }
    })
    return deletePost
}

getAllUsers()
getPostsByUserId()
getUserAndProfileById()
updatePost()
deletePostById()