import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { client } from "../.."
import { useLocalStorage } from "../../util/hooks"
import useJudgeName from "./useJudgeName"

export default function useScore() {
  const [scores, set] = useState()
  const { eventID } = useParams()
  const { name } = useJudgeName()

  useEffect(() => {
    const scores = client.service('api/active-scores').get(eventID)
    
  }, [])

  return 
}