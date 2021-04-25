import React from 'react'
import Rating from '@material-ui/lab/Rating'
import StarsIcon from '@material-ui/icons/Stars'
import { withStyles } from '@material-ui/core/styles'

const StyledRating = withStyles({
  iconFilled: {
    color: '#104F55'
  }
})(Rating)

const Reviews = ({ reviews, openForm, handleChange, average }) => {
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
          <h5>"{review.title}" - {review.name}</h5>
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

export default Reviews