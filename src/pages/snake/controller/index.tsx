import { useEffect, useMemo, useRef } from 'react'
import { DirectionType, Direction } from '../types'

import './index.scss'
import { directionAtom } from '../modal'
import { useAtom } from 'jotai'
export default function Index() {
  const [, setDirection] = useAtom(directionAtom)
  const dom = useMemo(() => {
    let ans = []
    for (let i = 0; i < 4; i++) {
      ans.push(
        <div
          className={`btn ${Direction[i]}`}
          onClick={() => {
            setDirection(Direction[i] as DirectionType)
          }}
        ></div>
      )
    }
    return ans
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <div className="controller">{dom}</div>
}
