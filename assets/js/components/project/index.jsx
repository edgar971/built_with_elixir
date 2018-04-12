import React from 'react'


const Project = (props) => {
    const {
        id,
        title,
        description,
        author,
        website_url,
        github_url,
        image_url,
        type,
        onClick } = props

    return (
        <article className="style1" onClick={(e) => onClick(e, id)} >
            <span className="image">
                <img src={image_url} alt={description} />
            </span>
            <a href="#">
                <h2>{title}</h2>
                <p>By: {author}</p>
                <div className="content">
                    <p>{description}</p>
                </div>
            </a>
        </article>
    )
}

export default Project