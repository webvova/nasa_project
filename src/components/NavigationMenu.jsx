import React from 'react'
import { NavLink } from 'react-router-dom'
import './navigation-menu.css'

const routes = [
  {
    path: '/apod',
    title: 'APOD'
  },
  {
    path: '/epic',
    title: 'EPIC'
  },
  {
    path: '/mars-rovers',
    title: 'Mars Rovers'
  },
  {
    path: '/nasa-library',
    title: 'NASA Library'
  },
]

const activeLinkStyles = { color: 'red' }

const NavigationMenu = () => {
  return (
    <ul>
      {
        routes.map((route) => (
          <li key={route.path} className='link'>
            <NavLink activeStyle={activeLinkStyles} to={route.path}>{route.title}</NavLink>
          </li>
        ))
      }
    </ul>
  )
}

export default NavigationMenu