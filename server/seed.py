from app import app, db
from test_data.reviews_data import reviews_list

with app.app_context():

    try:
        db.drop_all()

        db.create_all()

        db.session.add_all(reviews_list)

        db.session.commit()

        print("Everything committed 🤖")

    except Exception as e:
        print("There was an error.")
        print(e)
