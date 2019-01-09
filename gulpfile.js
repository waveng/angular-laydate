const gulp = require('gulp');
const templateCache = require('gulp-angular-templatecache');
const del = require('del');
const path = require('path');
const plugins = require('gulp-load-plugins')();
const open = require('open');

const app = {
  srcPath: 'src/', // 源代码
  prdPath: 'dist/' // 生产打包
};

const JS_APP = [
  "src/ng-laydate.js"
];

gulp.task('copy-laydate', function () {
  gulp.src(['node_modules/layui-laydate/dist/**'])
    .pipe(gulp.dest(app.prdPath + 'laydate/'));
});
/*
* js任务
* 在src目录下创建script文件夹，里面存放所有的js文件
*/
gulp.task('js', function () {
  return gulp.src(JS_APP)
    .pipe(plugins.concat('ng-laydate.js'))
    .pipe(gulp.dest(app.prdPath))
    .pipe(plugins.uglify())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(gulp.dest(app.prdPath))
    .pipe(plugins.connect.reload());
});

/*
* js任务
* 在src目录下创建script文件夹，里面存放所有的js文件
*/

gulp.task('eslint', function () {
  return gulp.src(JS_APP)
    .pipe(plugins.eslint({
      'rules': {
        'quotes': [2, 'single'],
        //'linebreak-style': [2, 'unix'],
        'semi': [2, 'always']
      },
      'env': {
        'browser': true
      },
      'globals': {
        'angular': true
      },
      'extends': 'eslint:recommended'
    }))
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failOnError());
});


 gulp.task('clean', function () {
    gulp.src([
     app.prdPath + '*'
    ], {
      read: false
    })
    .pipe(plugins.clean({
      force: true
    }));
  });
  /**
  gulp.task('clean', function (cb) {
    del(app.prdPath + '*', cb);
  });
  */

// 总任务
gulp.task('build', ['clean', 'eslint', 'js', 'copy-laydate']);

// 服务
gulp.task('serve', ['build'], function () {
  plugins.connect.server({ //启动一个服务器
    root: [app.devServe], // 服务器从哪个路径开始读取，默认从开发路径读取
    livereload: true, // 自动刷新
    port: 5566
  });
  // 打开浏览器
  setTimeout(() => {
    open('http://localhost:8080/index.html')
  }, 200);
  // 监听
  gulp.watch(app.srcPath + '**/*.js', ['eslint', 'js']);
});

// 定义default任务
gulp.task('default', ['serve']);
