'use strict';

module.exports = {
    systemJsConfig: './system.config.js',
    source: {
        folder: './src/BarSoundz/',
        files: {
            injectables: [
                './dist/www/scripts/es6-shim.min.js',
                './dist/www/scripts/shims_for_IE.js',
                './dist/www/scripts/vendor.min.js',
                './dist/www/scripts/angular2.min.js',
                './dist/www/scripts/system.setup.js',
                './dist/www/css/vendor.min.css',
                './dist/www/css/app.css'
            ],
            electronFiles: './electron/**/*.*',
            cordovaFiles: './cordova/',
            cordova: './src/BarSoundz/cordova.js',
            main: [
                './src/BarSoundz/index.html'
            ],
            systemSetupScript: './src/BarSoundz/system.setup.js',
            app: {
                everything: ['./src/BarSoundz/app/**/*', './src/BarSoundz/system.setup.js'],
                ts: [
                    './src/BarSoundz/app/**/*.ts'
                ],
                html: [
                    './src/BarSoundz/app/**/*.html'
                ],
                css: [

                    './src/BarSoundz/css/**/*.css'
                ],
                componentCss: [
                    './src/BarSoundz/app/**/*.css'
                ],
                assets: [
                    './src/BarSoundz/assets/**/*.*'
                ]
            },
            vendorStylesheets: [
                './src/BarSoundz/vendor/bootstrap/css/bootstrap.css',
                './src/BarSoundz/vendor/admin-lte/css/AdminLTE.css',
                './src/BarSoundz/vendor/admin-lte/css/skins/_all-skins.css',
                './src/BarSoundz/vendor/font-awesome/css/font-awesome.css',
                './src/BarSoundz/vendor/pNotify/pnotify.custom.css',
                './src/BarSoundz/vendor/leaflet-js/leaflet.css'
            ],
            vendorFonts: [
                './src/BarSoundz/vendor/font-awesome/fonts/*.*',
                './src/BarSoundz/vendor/bootstrap/fonts/*.*'
            ],
            shim: [
                './node_modules/es6-shim/es6-shim.min.js',
                './node_modules/angular2/es6/dev/src/testing/shims_for_IE.js'
            ],
            vendorJs: [
                './src/BarSoundz/vendor/hammerjs/hammer.js',
                './src/BarSoundz/vendor/jquery/jquery-2.1.4.js',
                './src/BarSoundz/vendor/jquery/jquery.hammer.js',
                './src/BarSoundz/vendor/jquery/jquery.slimscroll.js',
                './src/BarSoundz/vendor/pNotify/pnotify-adapter.js',
                './src/BarSoundz/vendor/pNotify/pnotify.custom.js',
                './src/BarSoundz/vendor/signalr/signalr.js',
                './src/BarSoundz/vendor/bootstrap/js/bootstrap.js',
                './src/BarSoundz/vendor/fastclick/fastclick.js',
                './src/BarSoundz/vendor/admin-lte/js/app.js',
                './src/BarSoundz/vendor/leaflet-js/leaflet-src.js'],
            angular2: [
                './node_modules/systemjs/dist/system-polyfills.js',
                './node_modules/angular2/bundles/angular2-polyfills.js',
                './node_modules/systemjs/dist/system.src.js',
                './node_modules/rxjs/bundles/Rx.js',
                './node_modules/angular2/bundles/angular2.dev.js',
                './node_modules/angular2/bundles/http.dev.js',
                './node_modules/angular2/bundles/router.dev.js',
                './node_modules/angular2-google-maps/bundles/angular2-google-maps.js'
            ]
        }
    },
    ts: {
        config: './tsconfig.json'
    },
    targets: {
        angular2MinJs: 'angular2.min.js',
        vendorMinJs: 'vendor.min.js',
        vendorMinCss: 'vendor.min.css',
        buildFolder: './dist/www',
        electronFolder: './dist/desktop',
        cordovaFolder: './dist/mobile',
        resourcesFolder: './resources/',
        appFolder: 'app',
        stylesFolder: 'css',
        minified: {
            js: 'app.js',
            css: 'app.css',
            templateCache: 'ng-templates.js'
        }
    }
};
