import styles from './Contact.module.css'
import LinkButton from '../layout/LinkButton'

function Contact() {
    return (
        <section className={styles.contact_container}>
            <h1>Fale conosco</h1>
            <p>Estamos aqui para ajudar! Envie suas dúvidas, sugestões ou feedbacks.</p>
            <LinkButton to="/Contact" text="Suporte"/>
        </section>
    )
}

export default Contact
