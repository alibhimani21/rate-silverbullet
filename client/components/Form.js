import React from 'react'
import StarsIcon from '@material-ui/icons/Stars'
import { withStyles } from '@material-ui/core/styles'
import Rating from '@material-ui/lab/Rating'

const StyledRatingInput = withStyles({
  iconFilled: {
    color: '#104F55'
  },
  iconHover: {
    color: '#7fffd4'
  }
})(Rating)

const Form = ({ handleSubmit, formData, handleForm, error, cancel, handleName, name, handleRating }) => {

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
          onChange={handleRating}
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
      <div className={error ? 'error' : ''}>
        <h5>{error ? 'Required field(s) missing!' : ''}</h5>
      </div>
      <div className="buttons">
        <button className="button">Submit</button>
        <button onClick={cancel} className="button">Cancel</button>
      </div>
    </form>
  </div>

}

export default Form

