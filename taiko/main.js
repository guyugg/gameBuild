(function () {

    'use strict';

    function boot () {

        var settings = window._CCSettings;
        window._CCSettings = undefined;
        var isDebug = settings.debug;
        if ( !isDebug ) {
            var uuids = settings.uuids;

            var rawAssets = settings.rawAssets;
            var assetTypes = settings.assetTypes;
            var realRawAssets = settings.rawAssets = {};
            for (var mount in rawAssets) {
                var entries = rawAssets[mount];
                var realEntries = realRawAssets[mount] = {};
                for (var id in entries) {
                    var entry = entries[id];
                    var type = entry[1];
                    // retrieve minified raw asset
                    if (typeof type === 'number') {
                        entry[1] = assetTypes[type];
                    }
                    // retrieve uuid
                    realEntries[uuids[id] || id] = entry;
                }
            }

            var scenes = settings.scenes;
            for (var i = 0; i < scenes.length; ++i) {
                var scene = scenes[i];
                if (typeof scene.uuid === 'number') {
                    scene.uuid = uuids[scene.uuid];
                }
            }

            var packedAssets = settings.packedAssets;
            for (var packId in packedAssets) {
                var packedIds = packedAssets[packId];
                for (var j = 0; j < packedIds.length; ++j) {
                    if (typeof packedIds[j] === 'number') {
                        packedIds[j] = uuids[packedIds[j]];
                    }
                }
            }
        }
        
        // init engine
        var canvas;

        if (cc.sys.isBrowser) {
            canvas = document.getElementById('GameCanvas');
            canvas.style.visibility = 'hidden';
        }

        var onStart = function () {
            cc.view.resizeWithBrowserSize(true);
            var sys = cc.sys;
            // UC browser on many android devices have performance issue with retina display
            var canRetina = [ 
                sys.BROWSER_TYPE_CHROME, sys.BROWSER_TYPE_IE, sys.BROWSER_TYPE_OPERA, sys.BROWSER_TYPE_SAFARI, sys.BROWSER_TYPE_FIREFOX, sys.BROWSER_TYPE_OUPENG
            ].indexOf(sys.browserType) >= 0;
            if (sys.os !== sys.OS_ANDROID || canRetina) {
                cc.view.enableRetina(true);
            }
            // UC browser on many android devices have performance issue with retina display
            // if (sys.os !== sys.OS_ANDROID || sys.browserType !== sys.BROWSER_TYPE_UC) {
            //     cc.view.enableRetina(true);
            // }
            //cc.view.setDesignResolutionSize(settings.designWidth, settings.designHeight, cc.ResolutionPolicy.SHOW_ALL);

            // Limit downloading max concurrent task to 2,
            // more tasks simultaneously may cause performance draw back on some android system / brwosers.
            // You can adjust the number based on your own test result, you have to set it before any loading process to take effect.
            if (sys.isBrowser && sys.os === sys.OS_ANDROID) {
                cc.macro.DOWNLOAD_MAX_CONCURRENT = 2;
            }

            // init assets
            cc.AssetLibrary.init({
                libraryPath: 'res/import',
                rawAssetsBase: 'res/raw-',
                rawAssets: settings.rawAssets,
                packedAssets: settings.packedAssets,
                md5AssetsMap: settings.md5AssetsMap
            });

            var launchScene = settings.launchScene;

            cc.director.loadScene(launchScene, null,
                function () {
                    if (sys.isBrowser) {
                        // show canvas
                        canvas.style.visibility = '';
                    }
                    cc.loader.onProgress = null;
                    console.log('Success to load scene: ' + launchScene);
                }
            );
        };

        // jsList
        var jsList = settings.jsList;
        var bundledScript = isDebug ? 'src/project.dev.js' : 'src/project.js';
        if (jsList) {
            jsList = jsList.map(function (x) { return 'src/' + x; });
            jsList.push(bundledScript);
        } else {
            jsList = [bundledScript];
        }
        var option = {
            //width: width,
            //height: height,
            id: 'GameCanvas',
            scenes: settings.scenes,
            debugMode: isDebug ? cc.DebugMode.INFO : cc.DebugMode.ERROR,
            showFPS: isDebug,
            frameRate: 60,
            jsList: jsList,
            groupList: settings.groupList,
            collisionMatrix: settings.collisionMatrix,
            //0:auto,1:canvas,2:webgl
            renderMode: 0
        };

        cc.game.run(option, onStart);
    }
    var cocos2d = document.createElement('script');
    cocos2d.async = true;
    cocos2d.src = window._CCSettings.debug ? 'cocos2d-js.js' : 'cocos2d-js-min.js';

    var engineLoaded = function () {
        document.body.removeChild(cocos2d);
        cocos2d.removeEventListener('load', engineLoaded, false);
        if (typeof VConsole !== 'undefined') {
            window.vConsole = new VConsole();
        }
        boot();
    };
    cocos2d.addEventListener('load', engineLoaded, false);
    document.body.appendChild(cocos2d);
    
})();
