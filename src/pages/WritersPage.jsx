import React from 'react'
import { Link } from 'react-router-dom'
import WriterCard from '../components/WriterCard'
import { writers } from '../data/writers'

export default function WritersPage() {
  return (
    <main className="main-content" id="main-content">
      <div className="writers-page">
        <div className="breadcrumb">
          <Link to="/">Home</Link><span>›</span><span>My Writers</span>
        </div>
        <h1 className="writers-page__title">My Writers</h1>
        <p className="writers-page__sub">Discover the authors behind your favourite books.</p>

        <div className="writers-grid">
          {writers.map(writer => (
            <WriterCard key={writer.id} writer={writer} />
          ))}
        </div>
      </div>
    </main>
  )
}
