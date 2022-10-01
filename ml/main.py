from model import mostPopular, recommend, search, productDetails

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
# ‘/’ URL is bound with hello_world() function.
def hello_world():
    return 'Hello World'

@app.route('/most-popular')
def MostPopular():
    return mostPopular()

@app.route('/recommend')
def Recommend():
    asin = request.args['asin']
    return  recommend(asin)

@app.route('/search')
def Search():
    item = request.args['item']
    return search(item)

@app.route('/product')
def Product():
    asin = request.args['asin']
    return productDetails(asin)

# main driver function
if __name__ == '__main__':
    # run() method of Flask class runs the application
    # on the local development server.
    app.run()