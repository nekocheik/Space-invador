const { series, parallel, src, dest, watch } = require('gulp');

function pages() {
  return src('src/index.html')
   .pipe(dest('dist'));
}
