import React, {useEffect} from 'react'

export default function Post({post, ...props}) {
    return (
        <div className="post">
            <h2>
                {post?.title}
            </h2>
            <div>
                {post?.text}
            </div>
            <div>
                {post?.id}
            </div>
        </div>
    )
}