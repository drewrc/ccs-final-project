

function Post ({id, text, img, author }) {
    return (
        <div key={id}>
            <img className='img-header' src={img} />
            <h2>{author}</h2>
            <p>{text} </p>
        </div>
    )
}

export default Post