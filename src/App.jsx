
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {ProgressBar, Button} from 'react-bootstrap';
import  {PopoutPage}  from './webpages/popoutPage.jsx'; // Adjust the path if necessary





function App() {
  const now =60;

  return(
    <div className="App">
      <header className='App-header'>
  <ProgressBar now={now} label={`${now}%`} variant="success" />
  
    </header>
    <PopoutPage />
    
    </div>
    
  )
}

export default App;
