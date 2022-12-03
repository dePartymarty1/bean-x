import ReactDOM from 'react-dom'
import logo from '../../assets/iconspinner.gif'
import styles from "./Loader.module.scss"

const Loader = () => {
  return ReactDOM.createPortal (
    <div className={styles.wrapper}>
        <div className={styles.loader}>
            <img src={logo} alt="Loading..." />
        </div> 
    </div>, 
    document.getElementById("loader") //goes to the index.html where the loader id is and attaches it to that div and loader is on top of the root so it is a part of everything
  )
}

export default Loader;
