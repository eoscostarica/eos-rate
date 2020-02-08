const massive = require('massive')
const dbConfig = require('./dbConfig')
const testData = require('./testData')
//const ratings = require('./getBlockchainRatings')

const updateRating = (rating) => {
  console.info('processing:\n', JSON.stringify({ rating }, null, 2))
  massive(dbConfig).then(db => {
    db.ratings.save(rating, function (err, res) {
      if (err) {
        console.log(err)
        return 
      }
      console.log('\nPOSTGRES UPDATED!!\n')
    })
  })
}

const updateRatingsData = (ratingsObj) => {
  if(Array.isArray(ratingsObj.rows)) {
    for (var i = 0; i < ratingsObj.rows.length; i++) {
      updateRating(ratingsObj.rows[i])
    }
  } else {
      console.log("Cannot save ratings object.")
  }
}

updateRatingsData(testData.testRatings)
