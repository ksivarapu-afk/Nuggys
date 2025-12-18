// Simple test component to verify React is working
export default function TestApp() {
  return (
    <div style={{ 
      padding: '50px', 
      backgroundColor: '#ff0000', 
      color: '#ffffff', 
      fontSize: '32px',
      textAlign: 'center',
      minHeight: '100vh'
    }}>
      <h1>TEST: If you see this, React is working!</h1>
      <p>Check the browser console for errors</p>
    </div>
  )
}

