import { useNavigate } from 'react-router-dom'
import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'

function NewProject(){
    const history = useNavigate()
    
    function createPost(project){
        project.cost = 0
        project.services = []
        project.id = Date.now().toString()  // id simples baseado timestamp

        // Pega projetos já salvos no sessionStorage (array)
        const storedProjects = sessionStorage.getItem('projects')
        let projects = storedProjects ? JSON.parse(storedProjects) : []

        // Adiciona o novo projeto
        projects.push(project)

        // Salva no sessionStorage
        sessionStorage.setItem('projects', JSON.stringify(projects))

        // Redireciona para a lista
        history('/projects', { state: { message: 'Projeto criado com sucesso!' } })
    }

    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para adicionar serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
}

export default NewProject
