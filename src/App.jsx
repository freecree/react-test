import './App.css';
import {useRef, useEffect, useState, useMemo} from 'react';
import PostList from './components/PostList';
import ClassCounter from './components/ClassCounter';
import MyInput from './components/UI/MyInput';
import MyButton from './components/UI/MyButton';
import MySelect from './components/UI/MySelect';
import Loader from './components/UI/Loader';

import {usePosts} from './hooks/usePosts';
import {useFetching} from './hooks/useFetching';
import usePagination from './hooks/usePagination';

import PostService from './Api/PostService';

function App() {
    const inputBodyRef = useRef();
    const [posts, setPosts] = useState([
        {id:1, title: "Postc1", text: "Description of first post"},
        {id:2, title: "Posta2", text: "Description of second post"},
        {id:3, title: "Postb3", text: "Description of third post"}
    ]);

    const [newPost, setNewPost] = useState({title: "", text: ""});
    const [sortedElement, setSortedElement] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const [currentPageNum, setCurrentPageNum] = useState(1);
    const [pageLimit, setPageLimit] = useState(10);
    const [totalCount, setTotalCount] = useState();

    const [fetchingLoading, fetchPosts, postsError] = useFetching(async () => {
        const posts = await PostService.getAllPosts(pageLimit, currentPageNum);
        setPosts(posts.data);

        const totalCount = posts.headers['x-total-count'];
        setTotalCount(totalCount);
    });

    const pagesNumsArr = usePagination(totalCount, pageLimit);

    useEffect(() => {
        fetchPosts();
        console.log("useEffect::currPage: ", currentPageNum);
    }, [currentPageNum]);

    const sortedAndSearchedPosts = usePosts(posts, sortedElement, searchQuery);
    function addPost(e) {
        e.preventDefault();
        setPosts([...posts, newPost]);
        setNewPost({id: Date.now(), title:"", text: ""});
    }

    return (
        <div className="App">
            <form>
                <h2>Create post</h2>
                <MyInput
                    placeholder="Enter title"
                    onChange={(e) => {setNewPost( {...newPost, title: e.target.value} )}}
                    value={newPost.title}
                />
                <MyInput
                    placeholder="Enter description"
                    onChange={(e) => {setNewPost( {...newPost, text: e.target.value} )}}
                    value={newPost.text}
                />
                {/*<MyBtn ref={inputBodyRef} onClick={addPost} style={{marginTop: '10px'}}>Create</MyBtn>*/}
                <button ref={inputBodyRef}>ref</button>
            </form>
            <MySelect 
                defaultName="Sorting by"
                value={sortedElement}
                onChange={setSortedElement}
                options={[
                    {value: "title", name: "title n"},
                    {value: "text", name: "text n"}
                ]}
            />
            <hr style={{marginTop: '20px'}}/>
            <MyInput
                placeholder="Search"
                onChange={(e) => {setSearchQuery( e.target.value)}}
                value={searchQuery}
            />
            {postsError && <h1 style={{color: 'red'}}>{postsError}</h1>}
            {fetchingLoading
                ? <Loader/>
                : <PostList posts={sortedAndSearchedPosts}></PostList>
            }
            <div className="pages-numbers">
                {
                    pagesNumsArr ?
                    pagesNumsArr.map((page) => 
                    <MyButton
                    key={page}
                    className={
                     page === currentPageNum ? "pages-numbers__btn pages-numbers__btn_current"
                    : "pages-numbers__btn"}
                    onClick={(e) => setCurrentPageNum(page)}
                    >{page}</MyButton>)
                    : 'no'
                }
            </div>
        </div>
    );
}

export default App;
