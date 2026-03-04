import { useEffect, useMemo, useRef, useState } from "react"
import { useCurrentUser } from "../../context/CurrentUserContext"
import { Loading, Tag } from "../../design"
import {
  getAllReactions,
  getPostReactionsByPostId,
  updateOrCreatePostReaction,
} from "../../services"

export const ReactionBar = ({ postId, size = "small" }) => {
  const { currentUser } = useCurrentUser()

  const [reactionTypes, setReactionTypes] = useState([])
  const [postReactions, setPostReactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [popReactionId, setPopReactionId] = useState(null)
  const [workingReactionId, setWorkingReactionId] = useState(null)

  // useRef hook is used here to store the timer ID for the pop animation
  // It allows us to clear it if the user clicks multiple times quickly without causing unnecessary re-renders
  const popTimerRef = useRef(null)

  // Load reaction catalog + reactions for this post
  useEffect(() => {
    let isMounted = true

    const load = async () => {
      setLoading(true)
      try {
        const [types, reactions] = await Promise.all([
          getAllReactions(),
          getPostReactionsByPostId(postId),
        ])

        if (!isMounted) return
        setReactionTypes(types)
        setPostReactions(reactions)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    load()

    return () => {
      isMounted = false
    }
  }, [postId])

  // Compute counts per reaction_id
  // useMemo lets counts stay in sync with postReactions without recalculating on every render
  const countsByReactionId = useMemo(() => {
    const counts = {}
    for (const pr of postReactions) {
      counts[pr.reaction_id] = (counts[pr.reaction_id] || 0) + 1
    }
    return counts
  }, [postReactions])

  // Find what reaction (if any) current user has for this post
  // The useMemo hook here ensures this calculation only runs when postReactions or currentUser changes
  const myReactionId = useMemo(() => {
    if (!currentUser) return null
    const mine = postReactions.find((pr) => pr.user_id === currentUser.id)
    return mine?.reaction_id ?? null
  }, [postReactions, currentUser])

  const refreshPostReactions = async () => {
    const reactions = await getPostReactionsByPostId(postId)
    setPostReactions(reactions)
  }

  const handleReact = async (reactionId) => {
    if (!currentUser || workingReactionId !== null) return

    // Cute little pop animation on click — clear any stacking timer first
    if (popTimerRef.current) clearTimeout(popTimerRef.current)
    setPopReactionId(reactionId)
    popTimerRef.current = window.setTimeout(() => setPopReactionId(null), 450)

    setWorkingReactionId(reactionId)
    try {
      await updateOrCreatePostReaction({
        post_id: postId,
        user_id: currentUser.id,
        reaction_id: reactionId,
      })

      await refreshPostReactions()
    } finally {
      setWorkingReactionId(null)
    }
  }

  if (loading) return <Loading />

  return (
    <div className="tags are-medium">
      {reactionTypes.map((rt) => {
        const count = countsByReactionId[rt.id] || 0
        const isSelected = myReactionId === rt.id
        const isWorking = workingReactionId === rt.id

        return (
          <Tag
            key={rt.id}
            rounded
            light
            className={`reaction-tag ${isSelected ? "reaction-selected" : ""}`}
            onClick={() => handleReact(rt.id)}
            style={{
              cursor: currentUser ? "pointer" : "default",
              opacity: isWorking ? 0.6 : 1,
              userSelect: "none",
            }}
            title={currentUser ? rt.label : "Log in to react"}
          >
            <span className="icon is-small mr-1">
              <i className={rt.icon_class} 
              style={{color: isSelected ? rt.color : "#b5b5b5"}}>
              </i>
            </span>
            <span>{count}</span>
            {popReactionId === rt.id ? <span className="reaction-pop">+1</span> : null}
          </Tag>
        )
      })}
    </div>
  )
}