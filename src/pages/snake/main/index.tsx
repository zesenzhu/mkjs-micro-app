import { useEffect, useRef } from 'react'
import './index.scss'
import { Snake } from './utils'
import { directionAtom } from '../modal'
import { useAtom } from 'jotai'
export default function Index() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [direction] = useAtom(directionAtom)
  const snakeRef = useRef<Snake | null>(null)
  useEffect(() => {
    if (canvasRef.current) {
      const snake = (snakeRef.current = new Snake(canvasRef.current, {
        speed: 2
      }))
      snake.start()
    }
  }, [])

  useEffect(() => {
    if (snakeRef.current) {
      snakeRef.current.changeDirection(direction)
    }
  }, [direction])

  return (
    <div className="main">
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  )
}
