import React from 'react'
import { Link } from 'react-router-dom'

export default function Notfound() {
  return (
    <div className="container no-result">
      <Link to="/dashboard" className="btn btn-primary btn-lg text-uppercase btn-homepage">go to homepage</Link>
    </div>
  )
}