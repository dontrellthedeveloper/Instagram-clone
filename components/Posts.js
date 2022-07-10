import React, {useState, useEffect} from 'react';
import {collection, onSnapshot, orderBy, query} from "@firebase/firestore";
import {db, storage} from "../firebase";
import Post from "./Post";
import Moment from "react-moment";




function Posts() {

    const [posts, setPosts] = useState([]);

    useEffect(() =>
         onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
            setPosts(snapshot.docs);
            }
        )
    , [db]);

    console.log(posts);

    return (
        <div>
            {posts.map((post) => (
                <div>
                    <Post
                        key={post.id}
                        id={post.id}
                        username={post.data().username}
                        userImg={post.data().profileImg}
                        img={post.data().image}
                        caption={post.data().caption}
                        timestamp={post.data().timestamp?.toDate()}
                    />
                </div>
            ))}
            <Post/>

        </div>
    );
}

export default Posts;