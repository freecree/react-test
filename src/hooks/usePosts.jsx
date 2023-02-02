import {useMemo} from 'react';
const useSortedPosts = (posts, sortedElement) => {
    const sortedPosts = useMemo(() =>{
        if (sortedElement) {
            return [...posts].sort((a, b) => a[sortedElement].localeCompare(b[sortedElement]) );
        }
        return posts;
    }, [posts, sortedElement]);
    return sortedPosts;
}

export const usePosts = (posts, sortedElement, searchQuery) => {
    const sortedPosts = useSortedPosts(posts, sortedElement);
    const sortedAndSearchedPosts = useMemo(() => {
        if (searchQuery) {
            return sortedPosts.filter(post => {
                if (post.title.toLowerCase().includes(searchQuery.toLowerCase())) return post;
            })
        }
        return sortedPosts;
    }, [searchQuery, sortedPosts]);
    return sortedAndSearchedPosts;
}