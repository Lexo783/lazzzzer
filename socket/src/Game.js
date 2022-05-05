modules.exports.StartingGame = function (isPlaying) {
  const interval = setInterval(function () {
    if(isPlaying) {
      console.log("playe")
    } else {
      console.log("NO")
    }
  })
  return interval
}

function game(isPlay) {

}
