import React from 'react'
import { usePing } from '../../hooks/apis/queries/usePing';

export default function PingComponent() {
  const {isLoading, data} = usePing();

  if(isLoading){
    return (
      <>
      <h1>Loading...</h1>
      </>
    )
  }


  return (
    <>
    <h1>Hello {data.message}</h1>
    </>
  )
}
