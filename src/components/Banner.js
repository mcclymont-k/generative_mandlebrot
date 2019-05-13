import React, { Component } from 'react';
import '../CSS/canvas.css';
import { Link } from 'react-router-dom'


class Banner extends Component {
  render() {
    return (
      <div className='bannerContainer'>
        <Link to='/mandlebrot'
              className='bannerButton'>MANDLEBROT</Link>
        <Link to='/generative'
              className='bannerButton'>GENERATIVE</Link>
      </div>
    )
  }
}
export default Banner
