module.exports = function () {
  return {
    tagId: process.env.GTAG_ID || null,
    debug_mode: process.env.GTAG_DEBUG_MODE || false,
  };
};