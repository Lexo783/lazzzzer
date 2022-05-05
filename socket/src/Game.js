modules.exports.StartingGame = function (isPlaying) {
  setTimeout(function () {
    if(game(isPlaying)) {
      console.log('KEKETE')
      return true
    } else {
      console.log("A LENVER")
      return true
    }
  }, 3000)
}

function game(isPlay) {

}
