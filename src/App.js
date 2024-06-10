import './App.css';
import BarChart from './components/Bar/Bar';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import Table from './components/Table/Table';
import Transaction from './components/TransactionStatistics/TransactionStatistics';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/table' element={<Table/>}/>
        <Route exact path ='/transaction' element={<Transaction/>}/>
        <Route exact path ='/bar' element={<BarChart/>}/>
        <Route exact path ='*' element={<NotFound/>}/>

      </Routes>
    </Router>
  )
    
}

export default App;
