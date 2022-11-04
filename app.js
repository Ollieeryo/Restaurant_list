const express = require('express')
const app = express()
const port = 3000

// require handlebars
const exphbs = require('express-handlebars')

// require restaurant json
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// route setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// show page setting and use params, and toLowerCase
app.get('/restaurant/:restaurant_id', (req, res) => {
  // get same id restaurant data
  // change restaurant.id to string, same with req.params.restaurant.id
  const restaurant = restaurantList.results.find(restaurant =>
    restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurant })
})

// queryString setting
app.get('/search', (req, res) => {
  // get keyword
  const keyword = req.query.keyword
  // get same data with keyword, and force toLowerCase
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants, keyword })
})

// start and listen
app.listen(port, () => {
  console.log(`The Express server is running on localhost:${port}`)
})