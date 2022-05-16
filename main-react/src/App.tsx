import { BrowserRouter as Router, Routes } from 'react-router-dom'
import getRoutes from './routes'

function App() {
    return (
        <Router>
            <Routes>
                {getRoutes()}
            </Routes>
        </Router>
    );
}

export default App;
