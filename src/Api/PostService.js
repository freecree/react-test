import axios from 'axios';

export default class PostService {
    static getAllPosts(pageLimit, pageNum) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {_limit: pageLimit, _page: pageNum}
                    }));
            }, 3000)
        })
    }
    static func2() {
        console.log("hello");
    }
}
