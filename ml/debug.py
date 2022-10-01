import pandas as pd
import numpy as np
import sklearn
from sklearn.decomposition import TruncatedSVD

reviews = pd.read_pickle('datasets/reviews_df.pkl')
products = pd.read_pickle('datasets/products_df.pkl')

products.dropna(inplace=True, subset=['title', 'price'])
products = products.head(5000)
products.to_pickle('products_sdf.pkl')
reviews = reviews[reviews['asin'].isin(products['asin'])]
print(reviews.shape)
reviews.to_pickle('reviews_sdf.pkl')
# reviews1 = reviews.head(10000)