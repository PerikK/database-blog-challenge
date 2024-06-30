const prismaClient = require("./db.js")

// async function getAllUsers() {
//     const allUsers = await prismaClient.user.findMany()
//     // console.log(allUsers);
//     return allUsers
// }

const getAllUsers = async () => {
	const allUsers = await prismaClient.user.findMany()
	// console.log(allUsers);
	return allUsers
}

const getPostsByUserId = async () => {
	const post = await prismaClient.post.findMany({
		where: {
			user_id: 2,
		},
	})
    // console.log(post)
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
    console.log(userWithProfile);
    return userWithProfile
}

const updatePost = async () => {
    const postsBeforeUpdate = await prismaClient.post.findUnique({
        where: {
            id: 1
        }
    })
    console.log("post 1 before update", postsBeforeUpdate)
	const postUpdate = await prismaClient.post.update({
		where: {
			id: 1,
		},
		data: {
			content: "Different than the original post content",
		},
	})
	console.log(postUpdate)
}

const deletePostById = async () => {
    const postsBeforeDelete = await prismaClient.post.findMany()
    console.log('Posts before',postsBeforeDelete);
    const deletePost = await prismaClient.post.delete({
        where: {
            id: 3
        }
    })
    // console.log(deletePost);
    const postsAfterDelete = await prismaClient.post.findMany()
    console.log(postsAfterDelete);
    return deletePost
}

getAllUsers()
getPostsByUserId()
getUserAndProfileById()
updatePost()
deletePostById()