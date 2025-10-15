import gulp from 'gulp';
import browserSync from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from "gulp-rename";
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';
import image from 'gulp-image';

const sass = gulpSass(dartSass);
// Static server
// gulp.task('server', function () {
//     browserSync.init({
//         server: {
//             baseDir: "dist/"
//         }
//     });

//     gulp.watch("src/*.html").on('change', browserSync.reload)
//     gulp.watch("src/css/*.css").on('change', browserSync.reload)
//     gulp.watch("src/js/*.js").on('change', browserSync.reload)
// });

gulp.task('styles', function () {
    return gulp.src("src/css/*.css")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            prefix: "", suffix: "",
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch("src/css/*.css").on("change", gulp.parallel('styles'));
    gulp.watch("src/*.html").on("change", gulp.parallel('html'));
    gulp.watch("src/js/*.*").on("change", gulp.parallel('scripts'));
});

gulp.task('html', function () {
    return gulp.src("src/*.html")
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('scripts', function () {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest('dist/js'));
});

gulp.task('fonts', function () {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('icons', function () {
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest('dist/icons'));
});

gulp.task('img', function () {
    gulp.src('src/img/**/*')
        .pipe(image())
        .pipe(gulp.dest('dist/img'));
});

gulp.task("default", gulp.parallel('watch', 'styles', 'scripts', 'fonts', 'icons', 'html', 'img'));