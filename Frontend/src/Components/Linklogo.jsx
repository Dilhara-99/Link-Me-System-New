import React from 'react'
import img from "./linklogoImg.jpg"


export default function Linklogo() {
  return (
    <div className="link-logo">
        <img src={img} alt="link-logo-img"  style={{height:'100px',width:'150px',marginLeft:'28%',marginRight:'82%'}}></img>
    </div>
  )
}