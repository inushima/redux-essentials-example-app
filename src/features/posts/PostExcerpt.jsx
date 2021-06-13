import React from 'react'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { Link } from 'react-router-dom'
import { ReactionButtons } from './ReactionButtons'

export const PostExcerpt = ({ key, post}) =>
  (
    <article className='post-excerpt' key={key}>
      <h3>{post.title}</h3>
      <PostAuthor userId={post.user} />
      <TimeAgo timestamp={post.date} />
      <p className='post-content'>{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
      <ReactionButtons post={post} />
    </article>
  )
