import { useEffect } from 'react'
import { useNavigate } from 'react-router'

interface RedirectProps {
  to?: string
}
export default function Redirect({ to = '/' }: RedirectProps) {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(to, { replace: true })
  }, [to, navigate])

  return null
}
