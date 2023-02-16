const { src, dest, watch, parallel } = require("gulp");

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');

function css(done) {
  src("src/scss/**/*.scss") // Identificar el archivo de sass
    .pipe(plumber()) //Muestra Errores 
    .pipe(sass()) // Compilarlo
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest("build/css")); // Almacenar en el disco duro

  done();
}
function imagenes(done) {

  opciones = {
    optimizationLevel: 3
  }

  src('src/img/**/*.{png,jpg}')
  .pipe(cache(imagemin(opciones)))
  .pipe(dest('build/img'))

  done()
}
function versionWebp(done) {

  const opciones ={
    quality: 50
  } ;

  src('src/img/**/*.{png,jpg}')
    .pipe(webp(opciones))
    .pipe(dest('build/img'))

  done()
}

function javascript(done) {
  src('src/js/**/*.js')
  .pipe( dest('build/js'))
  done()
}

function dev(done) {
    
    watch("src/scss/**/*.scss", css)
    watch("src/js/**/*.js", javascript)

    done()
}
exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.dev = parallel( imagenes, versionWebp, javascript, dev);
