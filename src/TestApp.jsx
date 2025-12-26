import { useState } from 'react'

function TestApp() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#030305',
      color: '#FF5500',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>
          🔧 Super Motor Trading
        </h1>
        <p style={{ color: '#E8E8F0', fontSize: '1.5rem' }}>
          If you can see this, React is working!
        </p>
        <p style={{ color: '#9090A0', marginTop: '1rem' }}>
          The main app is loading...
        </p>
      </div>
    </div>
  )
}

export default TestApp
