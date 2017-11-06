/* global _ */

export default class LodashMixinsManager {
  
  static _primeFactor(n) {
    let i = 2;
    while (i <= n) {
      if (n%i == 0){
          n /= i;    
      } else {
          i++;
      }
    }
    return i;
  };
  
  // https://stackoverflow.com/a/30964096
  static _factorize(num) {
    var half = Math.floor(num / 2), // Ensures a whole number <= num.
        factors = [1], // 1 will be a part of every solution.
        i, j;

    // Determine our increment value for the loop and starting point.
    num % 2 === 0 ? (i = 2, j = 1) : (i = 3, j = 2);

    for (i; i <= half; i += j) {
        num % i === 0 ? factors.push(i) : false;
    }

    factors.push(num); // Always include the original number
    return factors;
  }
  
  static _factorizeToPairs(num) {
    const factorPairs = [];
    const factorized = this._factorize(num);
     
    _.forEach(factorized, 
      (fac, all) => _.forEach(factorized, 
        (sndFac) => sndFac * fac === num ? factorPairs.push([fac, sndFac]) : _.noop
      )
    );
    return _.compact(factorPairs);
  }
  
  static _leastSpreadFactors(num) {
    return _.minBy(this._factorizeToPairs(num), (fcts) => Math.abs(fcts[0] - fcts[1]));
  }
  
  static loadMixins() {
    _.mixin({ 'primeFactor': this._primeFactor });
    _.mixin({ 'factorizeToPairs': this._factorizeToPairs });
    _.mixin({ 'leastSpreadFactors': this._leastSpreadFactors });
    _.mixin({ 'factorize': this._factorize });
  } 

}
