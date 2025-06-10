import styles from './ProjectCard.module.css'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

function ProjectCard({ id, name, budget, category, onRemove }) {

  const remove = (e) => {
    e.preventDefault()
    // Remove o projeto do sessionStorage
    const storedProjects = sessionStorage.getItem('projects')
    if (storedProjects) {
      const projects = JSON.parse(storedProjects)
      const filteredProjects = projects.filter(project => project.id !== id)
      sessionStorage.setItem('projects', JSON.stringify(filteredProjects))
      // Chama a função de atualização no componente pai
      if (onRemove) {
        onRemove(id)
      }
    }
  }

  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Orçamento: </span> R${budget}
      </p>
      <p className={styles.category_text}>
        <span className={`${styles[category.name.toLowerCase()]}`}></span> {category.name}
      </p>
      <div className={styles.project_card_actions}>
        <Link to={`/project/${id}`}>
          <BsPencil /> Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  )
}

export default ProjectCard
