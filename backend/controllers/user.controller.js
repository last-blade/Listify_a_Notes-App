const registerUser = (request, response) => {
    response.status(201).json({
        message: "OK"
    })
}

export default registerUser;