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
                    <svg className="icon icon-wrench"><use xlinkHref="/images/symbol-defs.svg#icon-eye"></use></svg>
                    <p>View More</p>
                </div>
            </a>
        </article>
    )
}

export default Project