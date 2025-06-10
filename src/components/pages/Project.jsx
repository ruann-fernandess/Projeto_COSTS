import {v4 as uuidv4} from 'uuid'
import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Project(){
    const {id} = useParams()
    const [project, setProject] = useState(null)
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        // Tentar carregar do sessionStorage primeiro
        const storedProject = sessionStorage.getItem(`project_${id}`)
        if(storedProject){
            const parsedProject = JSON.parse(storedProject)
            setProject(parsedProject)
            setServices(parsedProject.services || [])
        } else {
            // Se não tiver no sessionStorage, buscar do backend
            fetch(`https://projetocosts-production.up.railway.app/projects/${id}`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            })
            .then(resp => resp.json())
            .then((data) => {
                setProject(data)
                setServices(data.services || [])
                // Salvar no sessionStorage
                sessionStorage.setItem(`project_${id}`, JSON.stringify(data))
            })
            .catch(err => console.log(err))
        }
    }, [id])

    function saveProjectLocally(updatedProject){
        setProject(updatedProject)
        setServices(updatedProject.services || [])
        sessionStorage.setItem(`project_${id}`, JSON.stringify(updatedProject))
    }

    function editPost(updatedProject){
        setMessage('')
        if(updatedProject.budget < updatedProject.cost){
            setMessage('Orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }
        // Atualiza localmente (sem backend)
        saveProjectLocally(updatedProject)
        setShowProjectForm(false)
        setMessage('Projeto atualizado!')
        setType('success')
    }

    function createService(projectWithNewService){
        setMessage('')
        const lastService = projectWithNewService.services[projectWithNewService.services.length -1]
        lastService.id = uuidv4()

        const newCost = parseFloat(projectWithNewService.cost) + parseFloat(lastService.cost)

        if(newCost > parseFloat(projectWithNewService.budget)){
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            projectWithNewService.services.pop()
            return false    
        }

        projectWithNewService.cost = newCost

        // Atualiza localmente
        saveProjectLocally(projectWithNewService)
        setShowServiceForm(false)
        setMessage('Serviço adicionado com sucesso!')
        setType('success')
    }

    function removeService(serviceId, cost){
        const servicesUpdated = services.filter(service => service.id !== serviceId)

        const updatedProject = {
            ...project,
            services: servicesUpdated,
            cost: parseFloat(project.cost) - parseFloat(cost)
        }

        saveProjectLocally(updatedProject)
        setMessage('Serviço removido com sucesso!')
        setType('success')
    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    return(
        <> 
        {project && project.name ? (
            <div className={styles.project_details}>
                <Container customClass="column">
                    {message && <Message type={type} msg={message}/>}
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p><span>Categoria:</span> {project.category.name}</p>
                                <p><span>Total do Orçamento:</span> R${project.budget}</p>
                                <p><span>Total Utilizado</span> R${project.cost}</p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <ProjectForm handleSubmit={editPost} btnText="Concluir edição" projectData={project}/>
                            </div>
                        )}
                    </div>
                    <div className={styles.service_form_container}>
                        <h2>Adicione um serviço:</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                        </button>
                        <div className={styles.project_info}>
                            {showServiceForm && (
                                <ServiceForm
                                    handleSubmit={createService}
                                    btnText="Adicionar serviço"
                                    projectData={project}
                                />
                            )}
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass='start'>
                        {services.length > 0 ? (
                            services.map(service => (
                                <ServiceCard
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}
                                />
                            ))
                        ) : (
                            <p>Não há serviços cadastrados.</p>
                        )}
                    </Container>
                </Container>
            </div>
        ) : (
            <Loading />
        )}
        </>
    )
}

export default Project
