import React from 'react'

const UserPage = async (props: { params: Promise<{ userId: string }> }) => {
    const params = await props.params;

    const {
        userId
    } = params;

    return (
        <div>UserPage</div>
    )
}

export default UserPage