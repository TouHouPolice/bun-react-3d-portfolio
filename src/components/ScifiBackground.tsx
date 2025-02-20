import { type ReactElement, useState, useEffect } from 'react'
import { Animator } from '@arwes/react-animator'
import { GridLines, Dots, MovingLines } from '@arwes/react-bgs'
import { LOAD_CANVAS } from '@utils/Constants'

const BACKGROUND_COLOR_CANVAS_OFF ="rgba(0, 9, 6, 0.91)"
const BACKGROUND_COLOR_CANVAS_ON ="rgba(0, 9, 6, 0.05)"

const ScifiBackground = (): ReactElement => {
  const [active, setActive] = useState(true)

  useEffect(() => {
    const tid = setInterval(() => {
      setActive(!active);
    }, 
      active ? 5_000 : 1_000
    )
    return () => clearTimeout(tid)
  }, [active])

  return (
    <Animator active={active} duration={{ enter: 1, interval: 10 }}>
      <div
        className='scifi-background'
        style={{
          opacity: 1.0,
          backgroundColor: LOAD_CANVAS ? BACKGROUND_COLOR_CANVAS_ON : BACKGROUND_COLOR_CANVAS_OFF,
        }}
      >
        <GridLines lineColor="hsla(180, 100%, 75%, 0.05)" distance={30} />
        <Dots color="hsla(180, 100%, 75%, 0.05)" distance={30} />
        <MovingLines lineColor="hsla(180, 100%, 75%, 0.07)" distance={30} sets={20} />
      </div>
    </Animator>
  )
}

export default ScifiBackground