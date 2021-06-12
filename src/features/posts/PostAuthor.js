import { useSelector } from 'react-redux'
import React from 'react'

export const PostAuthor = ({userId}) => {
  const author = useSelector(state =>
    state.users.find(user => user.id === userId)
  )

  return <span>by {author ? author.name : 'Unknown author'}</span>
}
