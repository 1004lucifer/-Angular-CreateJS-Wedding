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
      {src: 'wife.jpg', id: 'wife'}
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
        {src: 'friend11.png', id: 'friend11'}
      ],
      manifest3 = [
        {src: 'etc1.jpg', id: 'etc1'},
        {src: 'etc2.jpg', id: 'etc2'},
        {src: 'etc3.jpg', id: 'etc3'},
        {src: 'etc4.jpg', id: 'etc4'},
        {src: 'etc5.jpg', id: 'etc5'},
        {src: 'etc6.jpg', id: 'etc6'},
        {src: 'etc7.jpg', id: 'etc7'},
        {src: 'etc8.jpg', id: 'etc8'},
        {src: 'etc9.jpg', id: 'etc9'},
        {src: 'etc10.jpg', id: 'etc10'},
        {src: 'etc11.jpg', id: 'etc11'},
        {src: 'etc12.jpg', id: 'etc12'},
        {src: 'etc13.jpg', id: 'etc13'},
        {src: 'etc14.jpg', id: 'etc14'},
        {src: 'etc15.jpg', id: 'etc15'},
        {src: 'etc16.jpg', id: 'etc16'},
        {src: 'etc17.jpg', id: 'etc17'}
      ],
      loader = new createjs.LoadQueue(true),
      loader2 = new createjs.LoadQueue(true),
      loader3 = new createjs.LoadQueue(true);

    //createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);  // need this so it doesn't default to Web Audio
    //loader.installPlugin(createjs.Sound);

    this.getResult = function (asset) {
      return loader.getResult(asset) ? loader.getResult(asset) : 
            loader2.getResult(asset) ? loader2.getResult(asset) : loader3.getResult(asset);
    };
    this.getLoader = function () {
      return loader;
    };
    this.getLoader2 = function () {
      return loader2;
    };
    this.getLoader3 = function () {
      return loader3;
    };
    this.loadAssets = function () {
      loader.loadManifest(manifest1, true, "/assets/");
    };
    this.loadAssets2 = function () {
      loader2.loadManifest(manifest2, true, "/assets/");
    };
    this.loadAssets3 = function () {
      loader3.loadManifest(manifest3, true, "/assets/");
    };
  });
