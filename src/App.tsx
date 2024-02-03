import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ListGroup from './components/ListGroup'
import Button from './components/Button'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Button>Eddu</Button>
      <ListGroup></ListGroup>
    </div>
  );
}

export default App
