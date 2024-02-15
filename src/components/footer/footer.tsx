// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from "../footer/footer.module.css";

export function Footer() {
  return (
      <footer className={styles.container}>
          <p>&copy; 2024 Todos os direitos para Dev-Currency</p>
          <p>Termos de Serviço | Política de Privacidade</p>
      </footer>
  );
}
