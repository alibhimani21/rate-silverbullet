from flask import Blueprint, request
from models.review_model import Review, ReviewSchema
from marshmallow.exceptions import ValidationError

review_schema = ReviewSchema()

router = Blueprint(__name__, "reviews")

@router.route("/reviews", methods=["GET"])
def get_reviews():
    reviews = Review.query.all()
    return review_schema.jsonify(reviews, many=True), 200

@router.route("/highest-rated", methods=["GET"])
def get_highest_rating():
    reviews = Review.query.all()
    sorted_reviews = sorted(reviews, key=lambda review: review.score, reverse=True)
    return review_schema.jsonify(sorted_reviews, many=True), 200

# @router.route("/test", methods=["GET"])
# def get_test():
#     reviews = Review.query.order_by('score').all()
#     return review_schema.jsonify(reviews, many=True), 200

@router.route("/lowest-rated", methods=["GET"])
def get_lowest_rating():
    reviews = Review.query.all()
    sorted_reviews = sorted(reviews, key=lambda review: review.score)
    return review_schema.jsonify(sorted_reviews, many=True), 200

@router.route("/reviews", methods=["POST"])
def add_review():

    # try:
        new_review = request.json
        review = review_schema.load(new_review)
        review.save()
        return review_schema.jsonify(review), 200
    
    # except ValidationError as e:
    #     return {"errors": e.messages, "messages": "Something went wrong"}

@router.route("/average-score", methods=["GET"])
def get_average_score():
    reviews = Review.query.all()
    scores = []
    for review in reviews:
        scores.append(review.score)
    average = round(sum(scores)/len(scores), 2)
    result = {"average": average}
    return result, 200
