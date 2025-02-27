import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ReactionButtons } from './ReactionButtons'
import { TimeAgo } from './TimeAgo'
import { PostAuthor } from './PostAuthor'
import { fetchPosts, selectAllPosts } from './postsSlice'
import { PostExcerpt } from './PostExcerpt'

export const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const postStatus = useSelector(state => state.posts.status)
  const error = useSelector(state => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content
  if (postStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (postStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map(post => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )

  // const renderPosts = orderedPosts.map(post => (
  //   <article className='post-excerpt' key={post.id}>
  //     <h3>{post.title}</h3>
  //     <PostAuthor userId={post.user} />
  //     <TimeAgo timestamp={post.date} />
  //     <p className='post-content'>{post.content.substring(0, 100)}</p>
  //     <Link to={`/posts/${post.id}`} className="button muted-button">
  //       View Post
  //     </Link>
  //     <ReactionButtons post={post} />
  //   </article>
  // ))
  //
  // return (
  //   <section className='posts-list'>
  //     <h2>Posts</h2>
  //     {renderPosts}
  //   </section>
  // )
}
