const gulp = require("gulp");
const concat = require("gulp-concat");
const scripts = require("./scripts.json");
const styles = require("./styles.json");

gulp.task("css", function (cb) {
  gulp.src(styles).pipe(concat("main.css")).pipe(gulp.dest("./dist/css"));
  cb();
});

gulp.task("js", function (cb) {
  gulp.src(scripts).pipe(concat("scripts.js")).pipe(gulp.dest("./dist/js"));
  cb();
});

gulp.task("html", function (cb) {
  gulp.src("./app/**/*.html").pipe(gulp.dest("./dist/"));
  cb();
});

gulp.task("build", gulp.series(["css", "js", "html"]));
