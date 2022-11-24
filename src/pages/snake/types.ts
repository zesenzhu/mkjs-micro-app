enum Direction {
  Up,
  Down,
  Left,
  Right
}

type DirectionType = keyof typeof Direction

export { Direction }
export type { DirectionType }
