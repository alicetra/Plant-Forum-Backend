//Constructs the payload for JWT tokens to grab the user ID from it 
const jwt_payload_handler = (user) => {
    return {
        user_id: user._id,
    }
}

export {jwt_payload_handler}


