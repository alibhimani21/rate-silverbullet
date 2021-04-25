import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form'
import Reviews from './components/Reviews'

import 'normalize.css'
import './styles/style.scss'

const App = () => {
  const [reviews, updateReviews] = useState([])
  const [loading, updateLoading] = useState(true)
  const [average, updateAverage] = useState({})
  const [form, updateForm] = useState(false)
  const [formData, updateFormData] = useState({})
  const [name, updateName] = useState('')
  const [error, updateError] = useState(false)

  async function fetchData() {
    await axios.get('/api/reviews')
      .then(resp => {
        updateReviews(resp.data.reverse())
      })
  }

  async function fetchAverage() {
    await axios.get('api/average-score')
      .then(resp => {
        updateAverage(resp.data)
      })
  }

  useEffect(() => {
    fetchData()
    fetchAverage()
    updateLoading(false)
  }, [])

  async function fetchSortedData(endpoint) {
    await axios.get(`/api/${endpoint}`)
      .then(resp => {
        updateReviews(resp.data)
      })
  }

  function handleChange(option) {
    if (option === 'high') {
      fetchSortedData('highest-rated')
    } else if (option === 'low') {
      fetchSortedData('lowest-rated')
    } else {
      fetchData()
    }
  }

  function openForm() {
    updateFormData({
      title: '',
      score: 3,
      text: ''
    })
    updateName('')
    updateForm(true)
  }

  function handleForm(event) {
    const { name, value } = event.target
    updateFormData({ ...formData, [name]: value })
  }

  function handleRating(event) {
    const numRating = Number(event.target.value)
    updateFormData({ ...formData, score: numRating })
    console.log(typeof formData.score)
  }

  function handleName(event) {
    updateName(event.target.value)
    updateFormData({ ...formData, name: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (formData.title === '' || formData.review === '') {
      updateError(true)
    } else {
      try {
        await axios.post('/api/reviews', formData)
        updateForm(false)
        fetchData()
      } catch (err) {
        console.log(err.response.data)
      }
    }
  }

  function cancel() {
    updateForm(false)
    updateError(false)
  }

  if (loading) {
    return <div className="layout">
      <h3>Rate Silverbullet</h3>
      <div className="no-content">
        <h4 className="no-reviews">Loading...</h4>
      </div>
    </div>
  }

  if (form) {
    return <Form
      handleSubmit={handleSubmit}
      formData={formData}
      handleForm={handleForm}
      handleRating={handleRating}
      error={error}
      cancel={cancel}
      handleName={handleName}
      name={name} />
  }

  return <Reviews
    reviews={reviews}
    openForm={openForm}
    handleChange={handleChange}
    average={average} />
}

export default App