// Utility code, including vector math
const Util = {

  randomeVector(length) {
    // produce a random vector with the legnth
    const degree = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(degree), Math.cos(degree)], length);
  },

  scale(vec, m) {
    // scale the legth of the vector by the amount m.
    return [vec[0] * m, vec[1] * m];
  }

};

module.exports = Util;
