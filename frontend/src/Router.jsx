import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Createproject from './pages/Createproject'
import ProjectPlayground from './pages/ProjectPlayground'
import PingComponent from './components/atoms/PingComponent'


export default function Router() {
  return (
    <Routes>
        <Route path="/" element={<PingComponent/>} />
        <Route path="/project" element={<Createproject />} />
        <Route path="/project/:projectId" element={<ProjectPlayground />} />
      </Routes>
  )
}
