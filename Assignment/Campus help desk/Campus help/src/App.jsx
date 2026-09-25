import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const emptyForm = { studentName: '', email: '', category: 'Classroom support', description: '', priority: 'Normal' }
  const [form, setForm] = useState(emptyForm)
  const [requests, setRequests] = useState([])
  const [status, setStatus] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetch('/api/requests')
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load bookings.')
        return response.json()
      })
      .then(setRequests)
      .catch((error) => setStatus(error.message))
  }, [])

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSaving(true)
    setStatus('')
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const savedRequest = await response.json()
      if (!response.ok) throw new Error(savedRequest.error || 'Unable to save booking.')
      setRequests((currentRequests) => [...currentRequests, savedRequest])
      setForm(emptyForm)
      setStatus('Booking saved successfully.')
    } catch (error) {
      setStatus(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">CAMPUS HELP DESK</p>
        <h1>Book support when you need it.</h1>
        <p className="intro">Tell us what is blocking your day. Our team will review your request and get back to you.</p>
      </header>
      <section className="workspace">
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-heading"><span className="step">01</span><div><h2>New booking</h2><p>All fields are required.</p></div></div>
          <label>Student name<input name="studentName" value={form.studentName} onChange={handleChange} required /></label>
          <label>Email address<input type="email" name="email" value={form.email} onChange={handleChange} required /></label>
          <div className="field-row">
            <label>Support category<select name="category" value={form.category} onChange={handleChange}><option>Classroom support</option><option>IT support</option><option>Library support</option><option>Administration</option></select></label>
            <label>Priority<select name="priority" value={form.priority} onChange={handleChange}><option>Normal</option><option>Urgent</option><option>Low</option></select></label>
          </div>
          <label>What do you need help with?<textarea name="description" value={form.description} onChange={handleChange} rows="5" required /></label>
          <button type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save booking'}</button>
          {status && <p className="status" role="status">{status}</p>}
        </form>
        <aside className="request-list">
          <div className="list-heading"><div><span className="eyebrow">02 / ACTIVITY</span><h2>Saved bookings</h2></div><strong>{requests.length}</strong></div>
          {requests.length === 0 ? <p className="empty-state">No bookings yet. Your saved requests will appear here.</p> : <div className="requests">{requests.map((request) => <article className="request" key={request.id}><div><h3>{request.category}</h3><p>{request.studentName} · {request.email}</p></div><span className={`priority ${request.priority.toLowerCase()}`}>{request.priority}</span><p className="description">{request.description}</p></article>)}</div>}
        </aside>
      </section>
    </main>
  )
}

export default App
