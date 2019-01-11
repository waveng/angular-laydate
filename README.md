

# angular-laydate
[layDate](https://www.layui.com/laydate/) (日期与时间组件)的 angular 组件  
[layDate](https://www.layui.com/laydate/) (日期与时间组件)的 angular 集成  


## Usage

```js
var app = angular.module('myApp', ['$ngLaydate']);

```
## Samples
[Samples](index.html)

## support directive
* ng-laydate
* ng-laydatetime
* ng-layyear
* ng-laymonth
* ng-laytime


```html
<input type="text" class="ng-laydate" ng-model="value">

<input type="text" class="ng-laydatetime" ng-model="value">

<input type="text" class="ng-layyear" ng-model="value">

<input type="text" class="ng-laymonth" ng-model="value">

<input type="text" class="ng-laytime" ng-model="value">
```

## support options attr
* laydate-type
* laydate-format
* laydate-max
* laydate-min
* laydate-range
* laydate-ready
* laydate-done
* laydate-options


#####
only ‘ng-laydate’ support ‘laydate-type’

```html

<div><label>date</label><input type="text" class="ng-laydate" laydate-type="'date'"></div>
<div><label>datetime</label><input type="text" class="ng-laydate" laydate-type="'datetime'"></div>
<div><label>year</label><input type="text" class="ng-laydate" laydate-type="'year'"></div>
<div><label>month</label><input type="text" class="ng-laydate" laydate-type="'month'"></div>
<div><label>time</label><input type="text" class="ng-laydate" laydate-type="'time'"></div>

<div><label>format</label><input type="text" class="ng-laydatetime" laydate-format="'yyyy-MM-ddTHH:mm:ss'"></div>
<div><label>format</label><input type="text" class="ng-laydate" laydate-format="'yyyy-MM-dd HH:mm:ss'"></div>

<div><label>min & max</label><input type="text" class="ng-laydatetime" laydate-min="'2019-01-01'" laydate-max="'2019-01-25'"></div>
<div><label>min & max</label><input type="text" class="ng-laydate" laydate-min="'2019-01-01'" laydate-max="'2019-01-25'"></div>

<div><label>range true</label><input type="text" class="ng-laydate" laydate-range="true"></div>
<div><label>range custom</label><input type="text" class="ng-layyear" laydate-range="'='"></div>

<div><label>option range</label><input type="text" class="ng-laydate" laydate-options="{range:true}"></div>
<div><label>option value</label><input type="text" class="ng-laydate" laydate-options="{value: '2019-01-01'}"></div>

<div><label>ready</label><input type="text" class="ng-laydate" laydate-format="'yyyy-MM-dd'" laydate-range="true" ng-model="default" laydate-ready="ready"></div>
<div><label>done</label><input type="text" class="ng-laydate" laydate-range="true" ng-model="default" laydate-done="done"></div>
```
