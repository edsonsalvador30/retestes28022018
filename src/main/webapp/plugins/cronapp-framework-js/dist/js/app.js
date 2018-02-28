var cronappModules=["ui.router","ui.select","ui-select-infinity","ngResource","ngSanitize","custom.controllers","custom.services","datasourcejs","chart.js","ngJustGage","pascalprecht.translate","tmh.dynamicLocale","ui-notification","ui.bootstrap","ngFileUpload","report.services","upload.services","summernote"];window.customModules&&(cronappModules=cronappModules.concat(window.customModules));var app=function(){return angular.module("MyApp",cronappModules).constant("LOCALES",{locales:{pt_br:"Portugues (Brasil)",en_us:"English"},preferredLocale:"pt_br"}).config(["$httpProvider",function(e){var o=["$q","$rootScope",function(e,o){return{request:function(e){var o=JSON.parse(sessionStorage.getItem("_u"));return o&&o.token&&(e.headers["X-AUTH-TOKEN"]=o.token,window.uToken=o.token),e}}}];e.interceptors.push(o)}]).config(["$stateProvider","$urlRouterProvider","NotificationProvider",function(e,o,r){r.setOptions({delay:5e3,startTop:20,startRight:10,verticalSpacing:20,horizontalSpacing:20,positionX:"right",positionY:"top"}),e.state("index",{url:"",controller:"HomeController",templateUrl:"views/home.view.html"}).state("main",{url:"/",controller:"HomeController",templateUrl:"views/home.view.html"}).state("home",{url:"/home",controller:"HomeController",templateUrl:"views/home.view.html"}).state("home.pages",{url:"/{name:.*}",controller:"PageController",templateUrl:function(e){return"views/"+e.name+".view.html"}}).state("404",{url:"/error/404",controller:"PageController",templateUrl:function(e){return"views/error/404.view.html"}}).state("403",{url:"/error/403",controller:"PageController",templateUrl:function(e){return"views/error/403.view.html"}}),o.otherwise("/error/404")}]).config(["$translateProvider","tmhDynamicLocaleProvider",function(e,o){e.useMissingTranslationHandlerLog(),e.useStaticFilesLoader({files:[{prefix:"i18n/locale_",suffix:".json"},{prefix:"plugins/cronapp-framework-js/i18n/locale_",suffix:".json"}]}),e.registerAvailableLanguageKeys(["pt_br","en_us"],{"en*":"en_us","pt*":"pt_br","*":"pt_br"});var r=(window.navigator.userLanguage||window.navigator.language||"pt_br").replace("-","_");e.use(r.toLowerCase()),e.useSanitizeValueStrategy("escaped"),o.localeLocationPattern("plugins/angular-i18n/angular-locale_{{locale}}.js"),moment&&moment.locale(r)}]).directive("crnValue",["$parse",function(e){return{restrict:"A",require:"^ngModel",link:function(o,r,t,n){var a;a=t.value?t.value:e(t.crnValue)(o),r.attr("data-evaluated",JSON.stringify(a)),r.bind("click",function(e){o.$apply(function(){n.$setViewValue(a)}.bind(r))})}}}]).decorator("$xhrFactory",["$delegate","$injector",function(e,o){return function(r,t){var n=e(r,t),a=o.get("$http"),i=a.pendingRequests[a.pendingRequests.length-1];return angular.isFunction(i.onProgress)&&n.upload.addEventListener("progress",i.onProgress),n}}]).controller("PageController",["$scope","$stateParams","$location","$http","$rootScope",function(e,o,r,t,n){for(var a in app.userEvents)e[a]=app.userEvents[a].bind(e);try{cronapi&&(e.cronapi=cronapi)}catch(e){console.info("Not loaded cronapi functions"),console.info(e)}try{blockly&&(e.blockly=blockly)}catch(e){console.info("Not loaded blockly functions"),console.info(e)}e.params=o,e.$http=t;var i=r.search();for(var l in i)i.hasOwnProperty(l)&&(e.params[l]=i[l]);registerComponentScripts();try{$controller("AfterPageController",{$scope:e})}catch(e){}try{e.blockly.events.afterPageRender&&e.blockly.events.afterPageRender()}catch(e){}}]).run(["$rootScope","$state",function(e,o){e.$on("$stateChangeError",function(){if(arguments.length>=6){var e=arguments[5];404!==e.status&&403!==e.status||o.go(e.status.toString())}else o.go("404")})}])}(window);app.userEvents={},app.config={},app.config.datasourceApiVersion=2,app.bindScope=function(e,o){var r={};for(var t in o)"string"==typeof o[t]?r[t]=o[t]:"function"==typeof o[t]?r[t]=o[t].bind(e):r[t]=app.bindScope(e,o[t]);return r},app.registerEventsCronapi=function(e,o){for(var r in app.userEvents)e[r]=app.userEvents[r].bind(e);e.vars={};try{cronapi&&(e.cronapi=app.bindScope(e,cronapi),e.cronapi.$scope=e,e.safeApply=safeApply,o&&(e.cronapi.$translate=o))}catch(e){console.info("Not loaded cronapi functions"),console.info(e)}try{blockly&&(e.blockly=app.bindScope(e,blockly))}catch(e){console.info("Not loaded blockly functions"),console.info(e)}},window.safeApply=function(e){var o=this.$root.$$phase;"$apply"==o||"$digest"==o?e&&"function"==typeof e&&e():this.$apply(e)};var registerComponentScripts=function(){$(".carousel-indicators li").on("click",function(){var e="#"+$(this).parent().parent().parent().attr("id"),o=$(e+" .carousel-indicators li").index(this);$(e+" #carousel-example-generic").carousel(o)})};