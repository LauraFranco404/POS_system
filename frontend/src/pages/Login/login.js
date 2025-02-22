
import './login.css'

export default function Login()
{
    return (
        <div className='login-container'>
            <input placeholder="Document ID"></input>
            <input placeholder="Password"></input>
            <button type="submit">Login</button>
        </div>
    );
}