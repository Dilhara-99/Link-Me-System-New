import React from 'react'
import img from "./log-img.png"


export default function LoginImg() {
  return (
    <div className="img-logo">
        <img src={img} alt="admin-img"  style={{height:'180px',width:'180px'}}></img>
    </div>
  )
}
