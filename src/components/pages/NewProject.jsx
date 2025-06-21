import {useNavigate} from 'react-router-dom'
import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'

function NewProject(){

    const history = useNavigate()
    
    function createPost(project){

        //initialize costs and services
        project.cost = 0
        project.services = []

        /*fetch("https://projetocosts-production.up.railway.app/projects", {
            method: "POST",
            headers:{
                "content-type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) =>{
                console.log(data)
                //redirect
                history('/projects', { state: { message: 'Projeto criado com sucesso' } })

            }) 
            .catch(err => console.log(err))*/
         
         history('/projects', {
            state: {
                message: 'Projeto criado com sucesso! (Mudanças não armazenadas por questões de segurança.)',
            },
        }) 
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