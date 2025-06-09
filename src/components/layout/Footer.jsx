import styles from './Footer.module.css'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'

function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>

        <li>
            <a href="https://github.com/ruann-fernandess" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub />
            </a>
        </li>

        <li>
          <a href="https://www.instagram.com/ruann_fernandess" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
        </li>

        <li>
          <a href="https://www.linkedin.com/in/ruann-fernandess" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </li>

      </ul>
      <p className={styles.copy_right}>
        <span>Costs</span> &copy; 2025
      </p>
    </footer>
  )
}

export default Footer
