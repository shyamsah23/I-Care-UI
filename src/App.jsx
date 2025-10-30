import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@mantine/core'

const  App = ()  => {
  const [count, setCount] = useState(0)

  return (
    <div >
      <Button variant='gradient'>Hello</Button>
      <div className='bg-primary-600'>Hello 2</div>
      
    </div>
  )
}

export default App
