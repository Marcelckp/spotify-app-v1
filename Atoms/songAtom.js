import { atom } from 'recoil';

export const currentSongId = atom({
    key: 'currentSongId',
    default: null
})

export const songPlaying = atom({
    key: 'songPlaying',
    default: false
})