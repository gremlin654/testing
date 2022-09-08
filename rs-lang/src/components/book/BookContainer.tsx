import React, { useCallback, useEffect, useState } from 'react'
import { IUserWord, IWord, IWordState } from '../../models/IWord'
import { postAPI } from '../../services/PostService'
import { Book } from './Book'
import '../../style/words.scss'
import { Button, ButtonGroup, Pagination, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { wordSlice } from '../../store/reducers/WordSlice'
import { useDispatch } from 'react-redux'
import { current } from '@reduxjs/toolkit'
import { wordSliceUser } from '../../store/reducers/UserWords'
import { Difficult } from './Difficult'
import { Link } from 'react-router-dom'
import { IFullUser } from '../../models/IUser'
import { setLevelAndPage } from '../../store/reducers/ActionCreaters'
import { userSlice } from '../../store/reducers/UserSlice'
import { isUndefined } from 'util'
import { getRandomNumber } from '../games/Games'

const localPage = localStorage.getItem('page') || '0'
const localGroup = localStorage.getItem('group') || '0'
export const BookContainer = () => {
  const dispatch = useAppDispatch()
  // Number(localPage) !== 0 ? Number(localStorage.getItem('page')) :
  // Number(localGroup) !== 0 ? Number(localStorage.getItem('group')) :
  const page = useAppSelector((state) => state.wordSlice.page) as number
  const group = useAppSelector((state) => state.wordSlice.group) as number
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  const groups = [1, 2, 3, 4, 5, 6]

  const setUserWords = wordSliceUser.actions.getUserWords
  const setPage = wordSlice.actions.setPage
  const setGroup = wordSlice.actions.setGroup
  const { data: words, error, isLoading } = postAPI.useGetWordsQuery({ page, group })
  // const { words, isLoading } = useAppSelector((state) => state.levelSlice)
  const user = useAppSelector((state) => state.userSlice) as IFullUser
  const [arr, setArr] = useState([])
  const [render, setRender] = useState(false)
  const addWords = userSlice.actions.addUserWords
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   dispatch(setLevelAndPage({ group, page }))
  // }, [])

  // useEffect(() => {
  //   dispatch(setLevelAndPage({ group, page }))
  // }, [page, group])

  const uploadWordsUser: any = useCallback(async (object: { wordId: string; name: string; value: string; wordName: string }, token: string) => {
    setLoading(true)
    console.log(loading)
    try {
      const res = await fetch('https://rs-lang-back-diffickmenlogo.herokuapp.com/updateWord', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(object),
      })
      const data = await res.json()
      console.log(data)
      dispatch(addWords(data.userWords))
      const arrUser: any = words?.map((word) => {
        const foundWord = data.userWords.find((wordUser: any) => `${wordUser._id}` === `${word._id}`)
        if (foundWord) {
          return (word = {
            ...word,
            deleted: foundWord.deleted,
            difficult: foundWord.difficult,
            correct: foundWord.correct,
            fail: foundWord.fail,
          })
        }
        return (word = {
          ...word,
          correct: 0,
          fail: 0,
        })
      })
      setArr(arrUser)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
    setTimeout(() => {
      setLoading(false)
      console.log(loading)
    })
  }, [])
  // loading, setLoading
  // useEffect(() => {
  //   console.log(loading);
  // },[loading])

  useEffect(() => {
    if (user.token || user.userWords.length !== 0) {
      const arrUser: any = words?.map((word) => {
        const foundWord = user?.userWords.find((wordUser: any) => `${wordUser._id}` === `${word._id}`)
        if (foundWord) {
          return (word = {
            ...word,
            deleted: foundWord.deleted,
            difficult: foundWord.difficult,
            correct: foundWord.correct,
            fail: foundWord.fail,
          })
        }
        return (word = {
          ...word,
          correct: 0,
          fail: 0,
        })
      })
      setArr(arrUser)
    } else {
      const wordsRed: any = words
      setArr(wordsRed)
    }
    // console.log(arrUser)
  }, [words])
  return (
    <div className='wrapper'>
      <div className='game-btn__container'>
        <button className='game__btn'>
          <Link to='/games/sprint' onClick={() => dispatch(setLevelAndPage({ group, page }))}>
            Спринт
          </Link>
        </button>
        <button className='game__btn'>
          <Link to='/games/audio_chalenge' onClick={() => dispatch(setLevelAndPage({ group, page }))}>
            Аудиовызов
          </Link>
        </button>
      </div>
      <div className={user.token ? 'btn-difficult-con' : 'btn-difficult-block'}>
        <Link to='/book/difficult' className={user.settings.difficultWord ? 'btn-difficult' : 'btn-difficult-block'}>
          Сложные слова
        </Link>
      </div>
      {isLoading && <h1>Loading...</h1>}
      <div className='group-container'>
        {groups.map((el, index) => (
          <span
            key={index}
            className={group == index ? 'current-group' : 'group'}
            onClick={() => {
              dispatch(setGroup(index))
            }}
          >
            {el}
          </span>
        ))}
      </div>
      <div
        className={`words-wrapper ${
          group === 0
            ? 'group-0'
            : group === 1
            ? 'group-1'
            : group === 2
            ? 'group-2'
            : group === 3
            ? 'group-3'
            : group === 4
            ? 'group-4'
            : group === 5
            ? 'group-5'
            : ''
        }`}
      >
        {arr &&
          arr.map((word: IWord) => (
            <Book key={word._id} word={word} arr={arr} render={render} setRender={setRender} uploadWordsUser={uploadWordsUser} />
          ))}
      </div>
      <div className='pages'>
        {pages.map((el, index) => (
          <span
            key={index}
            className={page == index ? 'current-page' : 'page'}
            onClick={() => {
              dispatch(setPage(index))
            }}
          >
            {el}
          </span>
        ))}
      </div>
    </div>
  )
}
