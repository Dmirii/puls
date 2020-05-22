const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "src"
        }
    });

    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("*.scss").on('change', browserSync.reload);
   
  
});
//#sourse/scss/
gulp.task('styles', function() {
    return gulp.src("src/scss/*.+(scss|sass)")
         .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        //.pipe(rename({suffix: '.min', prefix: ''}).on('error', sass.logError) )
        .pipe(autoprefixer())        
        .pipe(gulp.dest("css"))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/scss/*.+(scss|sass)", gulp.parallel('styles'));
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));