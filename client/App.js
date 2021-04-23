import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Rating from '@material-ui/lab/Rating'
import { withStyles } from '@material-ui/core/styles'
import StarsIcon from '@material-ui/icons/Stars'
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
  const StyledRating = withStyles({
    iconFilled: {
      color: '#104F55'
    }
  })(Rating)
  const StyledRatingInput = withStyles({
    iconFilled: {
      color: '#104F55'
    },
    iconHover: {
      color: '#7fffd4'
    }
  })(Rating)

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
    console.log(formData)
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
    return <div className="layout">
      <h3>Rate Silverbullet</h3>
      <form onSubmit={handleSubmit}>
        <label> Title
          <input
            name="title"
            type="text"
            autoComplete="off"
            value={formData.title}
            onChange={handleForm} />
        </label>
        <label> Name (Optional)
          <input
            name="name"
            type="text"
            autoComplete="off"
            value={name}
            onChange={handleName} />
        </label>
        <label> Score
          <StyledRatingInput
            name="score"
            value={formData.score}
            onChange={handleForm}
            icon={<StarsIcon />}
          />
        </label>
        <label> Review
          <textarea
            name="text"
            value={formData.text}
            onChange={handleForm}>
          </textarea>
        </label>
        <div  className={error ? 'error' : ''}>
          <h5>{error ? 'Missing required fields!' : ''}</h5>
        </div>
        <div className="buttons">
          <button className="button">Submit</button>
          <button onClick={cancel} className="button">Cancel</button>
        </div>
      </form>
    </div>
  }

  if (reviews.length === 0) {
    return <div className="layout">
      <h3>Rate Silverbullet</h3>
      <h5 className="rating">Leave a review for <a href="https://wearesilverbullet.com/" target="blank">wearesilverbullet.com</a></h5>
      <button onClick={openForm}>Write a review</button>
      <div className="no-content">
        <h4 className="no-reviews">No reviews yet! Be the first to leave one!</h4>
      </div>
    </div>
  }

  return <div className="layout">
    <h3>Rate Silverbullet</h3>
    <h5 className="rating">Leave a review for <a href="https://wearesilverbullet.com/" target="blank">wearesilverbullet.com</a></h5>
    <button onClick={openForm}>Write a review</button>
    <h5 className="rating">Currently the average rating is <span>{average.average}/5</span></h5>
    <div className="content">
      <div className="container-header">
        <h4>Reviews</h4>
        <div className="dropdown">
          <h5>Sort By:</h5>
          <select
            onChange={(event) => handleChange(event.target.value)}
          >
            <option value="recent">Most recent</option>
            <option value="high">Highest rating</option>
            <option value="low">Lowest rating</option>
          </select>
        </div>
      </div>
      {reviews.map(review => {
        return <div key={review.id} className="review">
          <h5>"{review.title}", {review.name}</h5>
          <StyledRating
            value={review.score}
            name="score"
            readOnly
            icon={<StarsIcon />}
            size="small"
          /> 
          <p>{review.text}</p>
        </div>
      })}
    </div>
  </div>
}

export default App