import axios from "axios";
import { useState, useEffect } from "react";


const apiUrl = "http://localhost:3000/posts";
let newId = 0;

export default function Main({ removePost }) {

    const newPost = {
        id: newId,
        title: "",
        content: "",
        img: "",
        tags: "",
    }

    const [posts, setPosts] = useState([])
    const [formData, setFormData] = useState(newPost)

    useEffect(() => {
        // console.log("Effect used")
        getData()
    }, [])

    function getData() {
        axios.get(apiUrl).then((res) => {
            console.log(res.data)
            setPosts(res.data.data)
        })
    }

    function removePost(id) {
        axios.delete(apiUrl + "/" + id)
            .then(() => getData());
    }

    function handleInput(event) {

        const value = event.target.value;
        setFormData({ ...formData, [event.target.name]: value })
    }

    function handleSubmit(event) {
        event.preventDefault();

        setPosts(getData => [...getData, formData]);
        axios.post(apiUrl).then(() => getData(res.data.data))
        setFormData(newPost);

    }
    return (
        <>
            <section className="form" onSubmit={handleSubmit}>
                <h2>Inserisci un nuovo post</h2>
                <form>
                    <label htmlFor="title">Titolo del post</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        aria-describedby="titleHelp"
                        value={formData.title}
                        onChange={handleInput}
                        name="title"
                        required
                    />
                    <label htmlFor="content">Contenuto del post</label>
                    <input
                        type="text"
                        className="form-control"
                        id="content"
                        aria-describedby="contentHelp"
                        value={formData.content}
                        onChange={handleInput}
                        name="content"
                        required
                    />
                    <label htmlFor="img">Immagine del post</label>
                    <input
                        type="text"
                        className="form-control"
                        id="img"
                        aria-describedby="imgHelp"
                        value={formData.img}
                        onChange={handleInput}
                        name="img"
                        required />
                    <label htmlFor="tags">Tags del post</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tags"
                        aria-describedby="tagsHelp"
                        value={formData.tags}
                        onChange={handleInput}
                        name="tags"
                        required />
                    <button type="submit" className="btn">
                        Pubblica
                    </button>
                </form>
            </section>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h4>{post.title}</h4>
                        <p>{post.content}</p>
                        <img src={post.img} alt={post.title} />
                        <p>{post.tags}</p>

                        <button key={post.id}
                            onClick={() => removePost(post.id)}
                            className="btn btn-delete">
                            Delete
                        </button>
                    </li>

                ))}
            </ul>

        </>
    )
}