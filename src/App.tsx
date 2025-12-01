import './App.css'
import Sidebar from './Components/Sidebar/Sidebar'
import Header from './Components/Header/Header'

const  App = ()  => {
  return ( 
    <div>
      <div className="flex">
        <Sidebar />
        <Header />
      </div>
    </div>
  );
}

export default App
