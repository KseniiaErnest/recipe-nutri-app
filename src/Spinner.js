import React from 'react';
import { Hearts } from 'react-loader-spinner'

export default function Spinner() {
  return (
    <div className='container_loader'>
      <Hearts 
  height="360"
  width="360"
  color="#ff0000"
  ariaLabel="hearts-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  
  className='lds-roller'
  />
    </div>
  )
}
