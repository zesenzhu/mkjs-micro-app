import { useEffect, useRef } from 'react'
import './index.scss'
import { Snake } from './utils'
export default function Index() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>()
  useEffect(() => {
    if (canvasRef.current) {
      const snake = new Snake(canvasRef.current, { speed: 2 })
      snake.start()
    }
  }, [])
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
