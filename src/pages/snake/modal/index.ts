import { atom } from 'jotai'
import { DirectionType } from '../types'
export const directionAtom = atom<DirectionType>('Right')

// // 派生Atom
// const valueAtom1 = atom((get) => get(valueAtom) * 2)
// // 仅有更新函数的Atom
// const valueAtom2 = atom(null, (get, set, _arg) => set(directionAtom, get(directionAtom)  ))
