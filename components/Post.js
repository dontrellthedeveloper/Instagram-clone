
import {addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, setDoc, doc, deleteDoc} from "@firebase/firestore";
import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon
} from "@heroicons/react/outline";

import {HeartIcon as HeartIconFilled} from '@heroicons/react/solid'
import {useSession} from "next-auth/react";
import React, {useState, useEffect} from 'react';
import {db} from "../firebase";
import Moment from 'react-moment';


function Post({id, username, userImg, caption, img, timestamp}) {
    const {data: session} = useSession();
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [error, setError] = useState('');
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
            try {
                onSnapshot(
                    query(
                        // collection(db, 'posts', 'jmmnyP8NVanEMe96LWCI', 'comments'),
                        collection(db, 'posts', id, 'comments'),
                        orderBy('timestamp', 'desc')
                    ),
                    (snapshot) => {setComments(snapshot.docs)});
            } catch (error) {
                const {code, message} = error;
                setError(message)
                console.log(error)
            }
        //
        },[db, id])

    useEffect(() => {
        try {
            onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
                setLikes(snapshot.docs)})
        } catch (error) {
            const {code, message} = error;
            setError(message)
            console.log(error)
        }
    },[db, id])


    useEffect(() => {
        setHasLiked(
            likes.findIndex((like) => (like.id === session?.user?.uid)) !== -1)
    }, [likes])


    const likePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db, 'posts',id, 'likes', session.user.uid))
        } else {
            await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
                username: session.user.username
            })
        }

    }


    const sendComment = async (e) => {
        e.preventDefault()

        const commentToSend = comment;
        setComment('');

        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp()
        } )

    }



    // console.log(comments)

    return (
        <div className='bg-white my-7 border rounded-sm'>
            {/* Header */}
            <div className='flex items-center p-5'>
                <img src={userImg} className='rounded-full h-12 w-12 object-contain border p-1 mr-3' alt=""/>
                <p className='flex-1 font-bold'>{username}</p>
                <DotsHorizontalIcon className='h-5'/>
            </div>

            {/*  img  */}
            <img src={img} className='object-cover w-full' alt=''/>

            {/*  Button  */}
            {session && (
                <div className='flex justify-between px-4 pt-4'>
                    {
                        hasLiked ? (
                            <HeartIconFilled onClick={likePost} className='btn text-red-500' />
                        ) : (
                            <HeartIcon onClick={likePost} className='btn' />
                        )
                    }
                    <div className='flex space-x-4'>
                        <HeartIcon onClick={likePost} className='btn' />
                        <ChatIcon className='btn' />
                        <PaperAirplaneIcon className='btn' />
                    </div>

                    <BookmarkIcon className='btn' />
                </div>
            )}



            {/*  caption  */}

            <div className='flex items-center space-x-2'>

                <p className='p-5 truncate flex-1'>
                    {likes.length > 0 && (
                        <p className='font-bold mb-1'>{likes.length} likes</p>
                    )}
                    <span className='font-bold mr-1'>{username} </span>
                    {caption}
                </p>
                <Moment fromNow className='pr-5 text-xs font-semibold'>
                    {timestamp}
                </Moment>
            </div>


            {/*  comments  */}
            {comments.length > 0 && (
                <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
                    {comments.map((comment)=> (
                        <div key={comment.id} className='flex items-center space-x-2 mb-3'>
                            <img src={comment.data().userImage}
                                 className='h-7 rounded-full'
                                 alt="" />
                            <p className='text-sm flex-1'>
                                <span className='font-bold'>{comment.data().username} </span>{comment.data().comment}
                            </p>

                            <Moment fromNow className='pr-5 text-xs'>
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        </div>
                    ))}
                </div>
            )}


            {/*  input box  */}
            {session && (
            <form className='flex items-center p-4'>
                <EmojiHappyIcon className='h-7' />

                <input
                    type="text"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder='add a comment...'
                    className='border-none flex-1 focus:ring-0 outline-none'/>
                <button
                    type='submit'
                    disabled={!comment.trim()}
                    onClick={sendComment}
                    className='font-semibold text-blue-400'>Post</button>
            </form>
            )}

        </div>

    );
}

export default Post;