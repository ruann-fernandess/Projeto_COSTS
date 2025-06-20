import Message from "../layout/Message"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import { useLocation } from "react-router-dom"
import styles from "./Projects.module.css"
import ProjectCard from "../project/ProjectCard"
import { useState, useEffect } from 'react'
import Loading from "../layout/Loading"


function Projects(){
    const[projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    useEffect(() => {
        setTimeout( () => {
            fetch('https://projetocosts-production.up.railway.app/projects',{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                },
            }).then(resp => resp.json())
              .then(data =>{
                console.log(data)
                setProjects(data)
                setRemoveLoading(true)
              })
              .catch(err => console.log(err))
        }, 1500)
    }, [])

    function removeProject(id){
        /*fetch(`https://projetocosts-production.up.railway.app/projects/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },
        }).then((resp) => resp.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage('Projeto removido com sucesso!')
        })
        .catch((err) => console.log(err))*/
        setProjectMessage('Projeto removido com sucesso! (Mudanças não armazenadas por questões de segurança.)')
    }

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar projeto"/>
            </div>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <Container customClass="start">
                {projects.length > 0 && 
                    projects.map((project) => <ProjectCard 
                    name={project.name}
                    id={project.id}
                    budget={project.budget}
                    category={project.category.name}
                    key={project.id}
                    handleRemove={removeProject}
                    />)}
                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    )
}

export default Projects