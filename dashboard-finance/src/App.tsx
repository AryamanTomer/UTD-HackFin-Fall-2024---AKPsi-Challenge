import React from 'react';

function App() {
    const [count, setCount] = React.useState(0);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Hello, React + Vite!</h1>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}

export default App;
