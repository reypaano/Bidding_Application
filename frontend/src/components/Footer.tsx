import styles from "../styles/footer.module.css";
function Footer() {
  return (
    <footer className={`${styles.footer}`}>
      <div className={`${styles.footerContent}`}>
        <p>&copy; 2023 Biding App</p>
        <ul className={`${styles.socialIcons}`}>
          <li>
            <a href="#">Facebook</a>
          </li>
          <li>
            <a href="#">Twitter</a>
          </li>
          <li>
            <a href="#">Instagram</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
