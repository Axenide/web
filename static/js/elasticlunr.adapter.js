window.lunr = window.elasticlunr;

// Provide generateStopWordFilter for lunr-languages as elasticlunr lacks it
if (!window.lunr.generateStopWordFilter) {
  window.lunr.generateStopWordFilter = function (stopWords) {
    var words = stopWords.reduce(function (memo, stopWord) {
      memo[stopWord] = stopWord;
      return memo;
    }, {});

    return function (token) {
      if (token && words[token] !== token) return token;
    };
  };
}
