angular.module('angular-laydate')
    .directive('ngLaydate', ['$window', function ($window) {
        var DOC = $window.document;
        var js_onload = function () {
            return DOC.createElement('script').readyState ?
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
                };
        }();
        return {
            restrict: 'C',
            scope: {
                laydateType: '=',
                laydateFormat: '=',
                laydateOptions: '=',
                ngModel: '=',
                laydateSrc: '@'
            },
            link: function ($scope, element) {

                $scope.readyLaydate = function () {
                    if (!$window.laydate) {
                        var head = DOC.getElementsByTagName('head')[0],
                            script = DOC.createElement('script');
                        var id = 'script-laydate-js';
                        script.type = 'text/javascript';
                        script.src = ($scope.laydateSrc||'lib/laydate/') + 'laydate.js';
                        script.id = id;
                        script.async = true;

                        js_onload(script, function () {
                            $scope.render(false);
                        });

                        if (!DOC.getElementById(id)) {
                            head.appendChild(script);
                        }
                    }

                };
                $scope.isRender = true;

                $scope.render = function (show) {
                    var timeout = 0;
                    if (!$window.laydate) {
                        while (++timeout > 8 * 1000 / 100) {
                            $window.console && $window.console.log('load laydate.js');
                        }
                        if (!$window.laydate) {
                            $window.console && $window.console.error('laydate.js: Invalid');
                        }
                    }

                    var options = angular.copy($scope.laydateOptions) || {};
                    options.elem = element[0];
                    if ($scope.laydateType) {
                        options.type = $scope.laydateType;
                    }
                    if ($scope.laydateFormat) {
                        options.format = $scope.laydateFormat;
                    }
                    if ($scope.ngModel) {
                        options.value = $scope.ngModel;
                    }
                    options.done = function name(value) {
                        $scope.ngModel = value;
                    };

                    options.show = show;
                    $window.laydate.render(options);
                    $scope.isRender = false;
                };

                element.one('focus', function () {
                    if ($scope.isRender) {
                        $scope.render(true);
                    }
                });
                $scope.readyLaydate();
            }
        };
    }]);
