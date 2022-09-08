import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'
import { IFullUser } from '../../models/IUser'
import { IUserWord } from '../../models/IWord'
import { userSlice } from '../../store/reducers/UserSlice'
import { levelSlice } from '../../store/reducers/WordGroupSlice'
import { Cards } from './Cards'

export const Difficult = () => {
  const { setDifficultWords } = levelSlice.actions
  const dispatch = useDispatch()
  const user = useAppSelector((state) => state.userSlice) as IFullUser
  const [filter, setFilter] = useState([])

  const getWordsUser = useCallback(async () => {
    try {
      const res = await fetch('https://rs-lang-back-diffickmenlogo.herokuapp.com/userWords', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      })
      const data = await res.json()
    } catch (error) {
      console.log(error)
    }
  }, [])
  getWordsUser()
  const wordsUser = user.userWords
  useEffect(() => {
    const resWords: any = wordsUser.filter((word: any) => word.fail === 1 || word.difficult === true)
    setFilter(resWords)
  }, [wordsUser])
  // console.log(filter);
  return (
    <div className='wrapper'>
      <div className='game-btn__container'>
        <button className='game__btn'>
          {filter.length ? (
            <Link to='/games/sprint' onClick={() => dispatch(setDifficultWords(filter))}>
              Спринт
            </Link>
          ) : (
            'Спринт'
          )}
        </button>
        <button className='game__btn'>
          {filter.length ? (
            <Link to='/games/audio_chalenge' onClick={() => dispatch(setDifficultWords(filter))}>
              Аудиовызов
            </Link>
          ) : (
            'Аудиовызов'
          )}
        </button>
      </div>
      <h2>Сложные слова</h2>
      <div className='cards-container'>
        {/* {wordsUser && wordsUser.map((word: any) => 
          <Cards key={word._id} word={word}/>
        )} */}
        {filter.map((word: any) => (
          <Cards key={word._id} word={word} />
        ))}
      </div>
    </div>
  )
}
