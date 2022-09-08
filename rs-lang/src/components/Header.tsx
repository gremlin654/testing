import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import '../style/Header.scss'
import { Avatar } from '@mui/material'
import { IFullUser } from '../models/IUser'
import { levelSlice } from '../store/reducers/WordGroupSlice'

export default function Header() {
  const user = useAppSelector((state) => state.userSlice) as IFullUser
  const { setFooterOf } = levelSlice.actions
  const dispatch = useAppDispatch()

  return (
    <header>
      <div className='wrapper'>
        <div className='header__container'>
          <div className='header__logo'>
            <h1>RS Lang</h1>
          </div>
          <nav className='header_nav'>
            <ul className='header-nav_list'>
              <li>
                <Link to='/' onClick={() => dispatch(setFooterOf(null))}>
                  Главная
                </Link>
              </li>
              <li>
                <Link to='/book' onClick={() => dispatch(setFooterOf(null))}>
                  Учебник
                </Link>
              </li>
              <li>
                <Link to='/games' onClick={() => dispatch(setFooterOf(null))}>
                  Мини-игры
                </Link>
              </li>
              {user.token ? (
                <li>
                  <Link to='/statistics' onClick={() => dispatch(setFooterOf(null))}>
                    Статитика
                  </Link>
                </li>
              ) : (
                ''
              )}

              <li>
                <Link to='/profile' onClick={() => dispatch(setFooterOf(null))}>
                  Настройки
                </Link>
              </li>
              <li>
                <Link to='/about' onClick={() => dispatch(setFooterOf(null))}>
                  О команде
                </Link>
              </li>
            </ul>
          </nav>
          <div className='header__btn'>
            {user.userId !== '' ? (
              <Link to='/profile' className='profile__icon' onClick={() => dispatch(setFooterOf(null))}>
                <Avatar src={user.avatarURL} sx={{ width: 50, height: 50 }} color='primary' />
              </Link>
            ) : (
              <button className='btn'>
                <Link to='/signin' onClick={() => dispatch(setFooterOf(null))}>
                  <p>Войти</p>
                </Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
