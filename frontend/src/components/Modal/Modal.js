import styles from './Modal.module.css';
import { connect } from 'react-redux';
import { setModal } from '../../store/actions/ui';
function Modal({onClose}){
    return(
        <div className={styles.container}>
            <div className={styles.window}>
                <button onClick={ () => { setModal(false)} }>
                    cerrar
                </button>
                
            </div>

        </div>
    );
const mapActionsToProps = {
        setModal
      };
    }
export default connect (null, mapActionsToProps)(App);
