const asyncHandler = (func) => async (request, response, next) => {
    try {
        await func(request, response, next)    
    } 
    
    catch (error) {
        response.status(error.code || 500).json({
            message: error.message,
            success: false,
        })
    }
}

export {asyncHandler};