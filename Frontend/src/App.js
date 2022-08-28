import Header from './components/header/header'
import RegisterForm from './components/register-form/RegisterForm'
import './index.css'

const App = () => {
    return (
        <div className="App">
            <header className="App-Header">
                <Header/> 
            </header>
            <main className="App-Main">
                <RegisterForm/>
            </main>
        </div>
    );
}

export default App;
