import React from 'react'
import Rating from '@material-ui/lab/Rating'
import StarsIcon from '@material-ui/icons/Stars'
import { withStyles } from '@material-ui/core/styles'

const StyledRating = withStyles({
  iconFilled: {
    color: '#6873FF'
  }
})(Rating)

const Reviews = ({ reviews, openForm, handleChange, average }) => {
  if (reviews.length === 0) {
    return <div className="layout">
      <h3>Rate Silverbullet</h3>
      <h5 className="rating">Leave a review for <a href="https://wearesilverbullet.com/" target="blank">wearesilverbullet.com</a></h5>
      <div className="no-content">
        <h4 className="no-reviews">No reviews yet! Be the first to leave one!</h4>
      </div>
      <button onClick={openForm}>Write a review</button>
    </div>
  }

  return <div className="layout">
    <h3>Rate Silverbullet</h3>
    <h5 className="rating">Leave a review for <a href="https://wearesilverbullet.com/" target="blank">wearesilverbullet.com</a></h5>
    <div className="content">
      <div className="container-header">
        <h4 className="rating">Currently the average rating is <span>{average.average}/5</span></h4>
        <h4 className="mobile-rating">Average rating<span>{average.average}/5</span></h4>
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
      <div className="scroll">
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
    <button onClick={openForm}>Write a review</button>
  </div>
}

export default Reviews