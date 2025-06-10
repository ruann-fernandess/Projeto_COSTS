import styles from './Company.module.css'
import LinkButton from '../layout/LinkButton'

function Company() {
    return (
        <section className={styles.company_container}>
            <h1>Conheça a <span>Costs</span></h1>
            <p>Somos uma empresa dedicada a ajudar você a gerenciar seus projetos de forma eficiente e simples.</p>
            <LinkButton to="/Company" text="Saiba mais"/>
        </section>
    )
}

export default Company
