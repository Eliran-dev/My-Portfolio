import React from 'react';
import { Helmet } from "react-helmet";
import projects from '../../components/projects/projectsData';
import Project from '../../components/projects/index';
import './index.css';
const Projects = (props) => {

    const projectsRendering = 
    <div className="projects">
    {projects.map((project, index) => (
            <Project
            key={index}
            title={project.title}
            img={props.theme === 'Light' ? project.imgDark : project.img}
            imgTitle={project.imgTitle}
            />
        ))}
        </div>

    return (
        <section className="projects-page">
        <Helmet>
            <title tag="title">My Projects</title>
        </Helmet>
        {projectsRendering}

        </section>


    );
};

export default Projects;