const getMyRatingAverage = myRating => {
  console.log(Object.keys(myRating || {}).length)
  const average =
    ((myRating?.community || 0) +
      (myRating?.development || 0) +
      (myRating?.infrastructure || 0) +
      (myRating?.transparency || 0) +
      (myRating?.trustiness || 0)) /
    Object.keys(myRating || {}).length
  return average
}

export default getMyRatingAverage
