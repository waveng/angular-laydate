/*
 * @Author: wangle_r@163.com
 * @Date: 2019-01-11 18:05:44
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-01-11 18:07:06
 */
(function (root, factory) {
    root.$ngLaydate = factory(root.angular, root);
}(this, function (angular, window) {
    var $ngLaydate = {
        src: 'dist/laydate/',
        isReady: true,
        DOC: window.document,
        js_onload: (window.document.createElement('script').readyState ?
            function (node, callback) {
                node.onreadystatechange = function () {
                    var rs = node.readyState;
                    if (rs === 'loaded' || rs === 'complete') {
                        node.onreadystatechange = null;
                        callback.call(this);
                    }
                };
            } :
            function (node, callback) {
                node.addEventListener('load', callback, false);
            }),

        ready: function (cellback) {
            if ($ngLaydate.src && $ngLaydate.isReady && !window.laydate) {
                $ngLaydate.isReady = false;
                var head = $ngLaydate.DOC.getElementsByTagName('head')[0],
                    script = $ngLaydate.DOC.createElement('script');
                var id = 'script-laydate-js';
                script.type = 'text/javascript';
                script.src = $ngLaydate.src + 'laydate.js';
                script.id = id;
                script.async = true;

                $ngLaydate.js_onload(script, function () {
                    if(cellback){
                        cellback();
                    }
                });

                if (!$ngLaydate.DOC.getElementById(id)) {
                    head.appendChild(script);
                }
            } else if (window.laydate){
                if (cellback) {
                    cellback();
                }
            }
        },
        render: function ($scope, element, attrs, show, type) {
            var timeout = 0;
            var $layd;
            if (!window.laydate) {
                while (++timeout > 8 * 1000 / 100) {
                    if (window.console) {
                        window.console.log('load laydate.js');
                    }
                }
                if (!window.laydate) {
                    if (window.console) {
                        window.console.error('laydate.js: Invalid');
                    }
                    throw 'Not found laydate.js: Invalid';
                }
            }

            var options = angular.copy($scope.options) || {};
            options.elem = element[0];
            if (type){
                options.type = type;
            }else if ($scope.type) {
                options.type = $scope.type;
            }
            if ($scope.format) {
                options.format = $scope.format;
            }
            if ($scope.max) {
                options.max = $scope.max;
            }
            if ($scope.min) {
                options.min = $scope.min;
            }
            if ($scope.range) {
                options.range = $scope.range;
            }
            if ($scope.ngModel) {
                options.value = $scope.ngModel;
            }
            if (attrs.laydateReady) {
                options.ready = function (date,i) {
                    $scope.ready()(date, $layd||i);
                };
            }
            options.done = function name(value, date, endDate) {
				$scope.$apply(function() {
					$scope.ngModel = value;
				});
				if (attrs.laydateDone) {
                   $scope.done()(value, date, endDate, $layd);
				}
			};

            options.show = show;
            $layd = window.laydate.render(options);
            $scope.isRender = false;
        },
        link: function ($scope, element, attrs, type) {

            $scope.isRender = true;

            $scope.$render = function (show) {
                if ($scope.isRender) {
                    $ngLaydate.render($scope, element, attrs, show, type);
                }
            };

            element.one('focus', function () {
                if ($scope.isRender) {
                    $scope.$render(true);
                }
            });


            $ngLaydate.ready(function () {
                $scope.$render(false);
            });

        }
    };

    var scopeOptions = {
        options: '=laydateOptions',
        type: '=laydateType',
        format: '=laydateFormat',
        max: '=laydateMax',
        min: '=laydateMin',
        range: '=laydateRange',
        ready: '&laydateReady',
        done: '&laydateDone',
        ngModel: '='
    };

    angular.module('$ngLaydate', [])
        .directive('ngLaydate',  function () {
            return {
                restrict: 'AC',
                scope: angular.copy(scopeOptions),
                link: function ($scope, element, attrs) {
                    $ngLaydate.link($scope, element, attrs, $scope.type);
                }
            };
        })
        .directive('ngLaydatetime',  function () {
            return {
                restrict: 'AC',
                scope: angular.copy(scopeOptions),
                link: function ($scope, element, attrs) {
                    $ngLaydate.link($scope, element, attrs, 'datetime');
                }
            };
        })
        .directive('ngLayyear',  function () {
            return {
                restrict: 'AC',
                scope: angular.copy(scopeOptions),
                link: function ($scope, element, attrs) {
                    $ngLaydate.link($scope, element, attrs, 'year');
                }
            };
        })
        .directive('ngLaymonth',  function () {
            return {
                restrict: 'AC',
                scope: angular.copy(scopeOptions),
                link: function ($scope, element, attrs) {
                    $ngLaydate.link($scope, element, attrs, 'month');
                }
            };
        })
        .directive('ngLaytime',  function () {
            return {
                restrict: 'AC',
                scope: angular.copy(scopeOptions),
                link: function ($scope, element, attrs) {
                    $ngLaydate.link($scope, element, attrs, 'time');
                }
            };
        })
        ;
    return $ngLaydate;

}));