import {useAuth} from '../hooks/useAuth.js';
import {Navigate} from 'react-router';
import React from 'react'

const Protected = ({children}) => {
    const{loading, user} = useAuth()

    if(loading){
    return (
        <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{
                width: '48px',
                height: '48px',
                border: '5px solid rgba(225, 3, 77, 0.2)',
                borderTop: '5px solid #e1034d',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
            }} />
        </main>
    )
}

    if(!user){
        return <Navigate to="/login" />
    }

  return children
}

export default Protected