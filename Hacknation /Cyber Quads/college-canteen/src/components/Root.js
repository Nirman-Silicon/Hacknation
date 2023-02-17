import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Root() {

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/home")
    }, [navigate])

    return (
        <div>
            Root
        </div>
    )
}

export default Root