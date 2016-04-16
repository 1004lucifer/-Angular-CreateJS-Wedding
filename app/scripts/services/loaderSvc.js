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
    var manifest1 = [
      {src: "ground.png", id: "ground"},
      {src: "sky.png", id: "sky"},
      {src: "hill1.png", id: "hill"},
      {src: "hill2.png", id: "hill2"},
      {src: "school.png", id: "school"},
      {src: 'husband.png', id: 'husband'},
      {src: 'wife.jpg', id: 'wife'},
      ],
      manifest2 = [
        {src: 'picture1.jpg', id: 'picture1'},
        {src: 'picture2.jpg', id: 'picture2'},
        {src: 'picture3.jpg', id: 'picture3'},
        {src: 'picture4.jpg', id: 'picture4'},
        {src: 'picture5.jpg', id: 'picture5'},
        {src: 'picture6.jpg', id: 'picture6'},
        {src: 'picture7.jpg', id: 'picture7'},
        {src: 'picture8.jpg', id: 'picture8'},
        {src: 'picture9.jpg', id: 'picture9'},
        {src: 'picture10.jpg', id: 'picture10'},
        {src: 'picture11.jpg', id: 'picture11'},
        {src: 'picture12.jpg', id: 'picture12'},
        
        {src: 'friend1.png', id: 'friend1'},
        {src: 'friend2.png', id: 'friend2'},
        {src: 'friend3.png', id: 'friend3'},
        {src: 'friend4.png', id: 'friend4'},
        {src: 'friend5.png', id: 'friend5'},
        {src: 'friend6.png', id: 'friend6'},
        {src: 'friend7.png', id: 'friend7'},
        {src: 'friend8.png', id: 'friend8'},
        {src: 'friend9.png', id: 'friend9'},
        {src: 'friend10.png', id: 'friend10'},
        {src: 'friend11.png', id: 'friend11'},
      ],
      loader = new createjs.LoadQueue(true),
      loader2 = new createjs.LoadQueue(true);

    //createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);  // need this so it doesn't default to Web Audio
    //loader.installPlugin(createjs.Sound);

    this.getResult = function (asset) {
      return loader.getResult(asset) ? loader.getResult(asset) : loader2.getResult(asset);
    };
    this.getLoader = function () {
      return loader;
    };
    this.getLoader2 = function () {
      return loader2;
    };
    this.loadAssets = function () {
      loader.loadManifest(manifest1, true, "/assets/");
    };
    this.loadAssets2 = function () {
      loader2.loadManifest(manifest2, true, "/assets/");
    };
  });
