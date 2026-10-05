module.exports = (config: { set: (arg0: { basePath: string; frameworks: string[]; }) => void; }) => {
  config.set({
    basePath: '../..',
    frameworks: ['jasmine'],
    //...
  });
}
