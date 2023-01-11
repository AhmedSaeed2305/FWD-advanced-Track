# The endpoint URL is : http://localhost:3000

# It has one route: http://localhost:3000/api/images which resize one image with the name "fjord" according to the query params, filename, width and height.

# For example: http://localhost:3000/api/images?filename=fjord&width=800&height=500

## This API has only one original image in images folder and stores the output resized image in the thumbs folder inside the images folder and if same subseqant requests
## done it retrive the already soted image without having to resize it again.