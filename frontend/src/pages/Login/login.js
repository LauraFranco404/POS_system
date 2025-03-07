
import { Link } from "react-router-dom";
import './login.css'

export default function Login()
{
    return (
        <div className='login-container'>
            <div className='login-form'>
                <Link to="/">
                    {/*<FontAwesomeIcon icon={faIgloo} size="1x" className={styles.iconStyle} />*/}
                    <img src="/POS_icon.png" alt="POS Logo" className="iconStyle" />
                </Link>
                <span className='form-title'>Point Of Sale System</span>
                <span className='form-subtitle'>Login</span>
                <div className="separator-line"></div>
                <form className="form-container">
                    <input placeholder="Document ID"></input>
                    <input placeholder="Password"></input>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}