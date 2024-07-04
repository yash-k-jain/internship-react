import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Form from './components/Form'
import ButtonAppBar from './components/AppBar'
import Api from './components/Api'

const App: React.FC = () => {
  const [toggle, setToggle] = React.useState<boolean>(false)

  return (
    <>
      <ButtonAppBar />
      <Router>
        <Routes>
          <Route path='/' element={<Form toggle={toggle} />} />
          <Route path='/second' element={<Api setToggle={setToggle} />} />
        </Routes>
      </Router>
      <ButtonAppBar />
    </>
  )
}

export default App
