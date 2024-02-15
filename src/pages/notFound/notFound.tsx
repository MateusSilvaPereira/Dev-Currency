import styles from '../notFound/notFound.module.css';
import { Link } from 'react-router-dom';

export function NotFound() {
    return(
        <div className={styles.container}>
            <h1>Pagina 404, não encontrada</h1>
            <Link to='/'>
                Acessar cripto moedas
            </Link>
        </div>
    )
}