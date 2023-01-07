
module.exports = {
  // //Should be STATIC_URL + path/to/build
  publicPath: ".",

  // Output to a directory in STATICFILES_DIRS
  // outputDir: path.resolve(__dirname, "../public/dist/"),

  // Django will hash file names, not webpack
  // filenameHashing: false,

  // See: https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  // runtimeCompiler: true,

  // devServer: {
  //   writeToDisk: true, // Write files to disk in dev mode, so Django can serve the assets
  // },

  transpileDependencies: ["vuetify"],
};
