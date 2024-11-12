import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import CurrencyExchange from './components/CurrencyExchange';

function App() {
  return (
    <div className="container">
      <CurrencyExchange />
    </div>
  );
}

export default App;
