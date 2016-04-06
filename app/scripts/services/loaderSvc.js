'use strict';

/**
 * @ngdoc service
 * @name weddingApp.loaderSvc
 * @description
 * # loaderSvc
 * Service in the weddingApp.
 */
angular.module('weddingApp')
  .service('loaderSvc', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var manifest = [
      {src: "ground.png", id: "ground"},
      {src: "sky.png", id: "sky"},
      {src: "hill1.png", id: "hill"},
      {src: "hill2.png", id: "hill2"},
      {src: "school.png", id: "school"},
      {src: 'husband.png', id: 'husband'}
    ], loader = new createjs.LoadQueue(true);
    //createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);  // need this so it doesn't default to Web Audio
    //loader.installPlugin(createjs.Sound);

    this.getResult = function (asset) {
      return loader.getResult(asset);
    };
    this.getLoader = function () {
      return loader;
    };
    this.loadAssets = function () {
      loader.loadManifest(manifest, true, "/assets/");
    };
  });
