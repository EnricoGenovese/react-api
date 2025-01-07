import axios from "axios";
import { useState, useEffect } from "react";


const apiUrl = "http://localhost:3000/posts";

export default function Main({ removePost }) {
    const [posts, setPosts] = useState([])

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

    // function removePost(id) {
    //     axios.delete(apiUrl + "/" + id)
    //     // getData();
    //     setPosts(posts.filter((post) => post.id !== id))
    // }
    function removePost(id) {
        axios.delete(apiUrl + "/" + id)
            .then(() => getData());
    }
    return (
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <h4>{post.title}</h4>
                    <p>{post.content}</p>
                    <img src={post.img} alt={post.title} />
                    <p>{post.tags.join(", ")}</p>

                    <button key={post.id}
                        onClick={() => removePost(post.id)}
                        className="btn btn-delete">
                        Delete
                    </button>
                </li>

            ))}

        </ul>
    )
}