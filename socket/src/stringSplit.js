//Takes a string in parameter and returns an array of the string splitted by ";"

module.exports.StringSplit = function(entryString) {

    if (entryString != "" && entryString != " " && entryString != null) {
        const splittedString = entryString.split(";");

        //we pop the last element of the array because it's an empty string
        if (splittedString[splittedString.length - 1] === '') {
            splittedString.pop();
            return splittedString;
        } else {
            return splittedString;
        }

    } else if (entryString == "" || entryString == " ") {
        console.log("Entry string is empty")
    } else if (entryString == null) {
        console.log("Entry string is null")
    } else {
        console.log("Error")
    }

}