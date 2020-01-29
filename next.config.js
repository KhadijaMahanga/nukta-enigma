const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const withImages = require('next-images');
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([withCSS, withFonts, withImages], {
    // exportTrailingSlash: true,
    // exportPathMap: function() {
    //   return {
    //     '/': { page: '/' },
    //     '/about': { page: '/about' },
    //     '/contact': { page: '/contact' },
    //     '/privacy': { page: '/privacy' },
    //     '/:sectionSlug': { page: '/[sectionSlug]' }
    //   };
    // }
});