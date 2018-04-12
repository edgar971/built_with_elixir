import ReactDOM from 'react-dom'
import React from 'react'
import "phoenix_html"
import App from './components/app'


const projects = [
  {
    id: 12323232,
    title: "Just My Luck",
    description: "magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est",
    author: "iledbury0",
    website_url: "https://techcrunch.com/some/cool/link/that/goes/nowhere",
    github_url: "blogs.com",
    image_url: "/images/image-to-text.png",
    type: "library"
  },
  {
    id: 1232323555,
    title: "Just My Luck",
    description: "magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est",
    author: "iledbury0",
    website_url: "https://techcrunch.com/some/cool/link/that/goes/nowhere",
    github_url: "blogs.com",
    image_url: "/images/image-to-text.png",
    type: "library"
  },
  {
    id: 12323235553,
    title: "An Awesome Project I created",
    description: "magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est",
    author: "iledbury0",
    website_url: "https://techcrunch.com/some/cool/link/that/goes/nowhere",
    github_url: "blogs.com",
    image_url: "/images/image-to-text.png",
    type: "library"
  },
  {
    id: 12323235551,
    title: "Texto: Random tool",
    description: "magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est",
    author: "iledbury0",
    website_url: "https://techcrunch.com/some/cool/link/that/goes/nowhere",
    github_url: "blogs.com",
    image_url: "/images/image-to-text.png",
    type: "library"
  },
  {
    id: 123232355511,
    title: "Just My Luck",
    description: "magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est",
    author: "iledbury0",
    website_url: "https://techcrunch.com/some/cool/link/that/goes/nowhere",
    github_url: "blogs.com",
    image_url: "/images/image-to-text.png",
    type: "library"
  }
]


// import socket from "./socket"

ReactDOM.render(<App projects={projects} />, document.querySelector('#app-root'))

