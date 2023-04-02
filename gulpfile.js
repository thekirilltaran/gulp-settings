'use strict';

/*connecting modules*/
const { series, watch, src, dest } = require('gulp');
  const browserSync  = require('browser-sync'),
  concat       = require('gulp-concat'),
  clean        = require('gulp-clean'),
  babel        = require('gulp-babel'),
  uglify       = require('gulp-uglifyjs'),
  rename       = require('gulp-rename'),
  del          = require('del'),
  imagemin     = require('gulp-imagemin'),
  pngquant     = require('imagemin-pngquant'),
  cache        = require('gulp-cache'),
  runSequence = require('gulp4-run-sequence');

  const sass = require('gulp-sass')(require('sass')),
  connect = require('gulp-connect'),
  autoprefixer = require('gulp-autoprefixer'),
  minify = require('gulp-minify'),
  cleanCss = require('gulp-clean-css');

/*--------------------------------------*/

/*function for gulp server */
function server(done) {
  browserSync.init({
    server: {
        baseDir: "../open-source/html5-css3-js_credit/"
    }
  });
  done();
}

/* function clears folders before new ones are loaded */
function cleanTask(done) {
  console.log('CLEAN DONE');
  return src(
    ['../open-source/html5-css3-js_credit/css/*', '../open-source/html5-css3-js_credit/js/*'],
    {read: false}
  )
  .pipe(clean({force: true})); 
}


function compScss() {
  console.log('SCSS DONE');
  return src('../open-source/html5-css3-js_credit/src/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded',
      indentWidth: 1,
      indentType: 'tab'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      Browserslist: ['last 2 versions'],
      cascade: true
    }))
    .pipe(minify())
    .pipe(cleanCss())
    .pipe(dest('../open-source/html5-css3-js_credit/css/'))
    // .pipe(server.reload());
};

function compJs() {
  	console.log('JS DONE');
  	return src([
    '../open-source/html5-css3-js_credit/src/js/common.js', 
    '../open-source/html5-css3-js_credit/src/js/nouislider.js', 
  	])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(minify())
    .pipe(dest('../open-source/html5-css3-js_credit/js/'))
    // .pipe(connect.reload());
}; 

async function asyncAwaitTask() {
  watch('../open-source/html5-css3-js_credit/src/scss/**/*.scss', compScss).on('change', browserSync.reload);
  watch('../open-source/html5-css3-js_credit/src/js/**/*.js', compJs).on('change', browserSync.reload);
}

// exports.build = build;
exports.default = series(cleanTask, compScss, compJs, asyncAwaitTask, server);




