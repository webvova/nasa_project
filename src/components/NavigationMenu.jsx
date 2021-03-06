import React from 'react'
import { NavLink } from 'react-router-dom'
import './navigation-menu.css'

import nasaImage from '../nasa.png'


const routes = [
  {
    path: '/apod',
    title: 'APOD'
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


const activeLinkStyles = { color: '#4287f5', textDecoration: 'underline' }

const NavigationMenu = () => {
  return (
    <div className='navigation-menu'>
      <img src={nasaImage} alt="" />
      <ul>
        {
          routes.map((route) => (
            <li key={route.path} className='link'>
              <NavLink activeStyle={activeLinkStyles} to={route.path}>{route.title}</NavLink>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default NavigationMenu