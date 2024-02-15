import styles from './header.module.css';
import img from '../../assets/logo.svg';
import { Link} from 'react-router-dom';
import { FaBitcoin } from 'react-icons/fa';
export function Header(){
    return(
        <header className={styles.container}>
           <div>
           <Link to='/'>
           <img className={styles.logo} src={img} alt="Imagem Logo"  />  <FaBitcoin size={40} color='#46a0ee' />
           </Link>
           </div>
        </header>
    )
}