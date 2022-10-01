import pandas as pd
import numpy as np
import sklearn
from sklearn.decomposition import TruncatedSVD

reviews = pd.read_pickle('datasets/reviews_sdf.pkl')
products = pd.read_pickle('datasets/products_sdf.pkl')

# products.dropna(inplace=True, subset=['title', 'price'])
# products = products.head(5000)
# reviews = reviews[reviews['asin'].isin(products['asin'])]
# print(reviews.shape)
# reviews1 = reviews.head(10000)
utility_matrix = reviews.pivot_table(values='overall', index='reviewerID', columns='asin', fill_value=0)
X = utility_matrix.T
SVD = TruncatedSVD(n_components=10)
decomposed_matrix = SVD.fit_transform(X)
correlation_matrix = np.corrcoef(decomposed_matrix)
product_names = list(X.index)

def productsDetails(i):
    res = products[products['asin'].isin(i)]
    return res.to_json(orient='records')

def mostPopular():
    rating = pd.DataFrame(reviews.groupby('asin')['overall'].count().sort_values(ascending=False))
    rating.reset_index(inplace=True)
    rating = rating.iloc[0:24]['asin']
    return productsDetails(rating)
# mostPopular()

def recommend(i):
    product_ID = product_names.index(i)
    correlation_product_ID = correlation_matrix[product_ID]
    Recommend = list(X.index[correlation_product_ID > 0.90])
    Recommend.remove(i)
    Recommend = pd.DataFrame(Recommend[0:12], columns=['asin'])
    return productsDetails(Recommend['asin'])
# recommend("6305275696")

def search(i):
    res = products.loc[products['title'].str.contains(i, case=False)]
    res = res.iloc[0:100]
    return res.to_json(orient='records')
# search('brown')

def productDetails(asin):
    t = list()
    t.append(asin)
    t = pd.DataFrame(t, columns=['asin'])
    return productsDetails(t['asin'])
# productDetails("6305275696")