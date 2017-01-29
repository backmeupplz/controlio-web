// the polyfills must be the first thing imported
import 'angular2-universal-polyfills';
import 'ts-helpers';
import './__workaround.browser'; // temporary until 2.1.1 things are patched in Core

// Angular 2
import { enableProdMode } from '@angular/core';
import { platformUniversalDynamic } from 'angular2-universal/browser';
import { bootloader } from '@angularclass/bootloader';

import { load as loadWebFont } from 'webfontloader';


require('css/vendor/bootstrap.css');
require('css/styles.less');
require('css/vendor/style.css');
require('css/styles.scss');

function load(url) {
  return new Promise(function(resolve, reject) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  })
}

load('https://checkout.stripe.com/checkout.js')
.then(function() {
  console.log('Loaded!');
})
.catch(function(err) {
  console.error('Something went wrong!', err);
})

// enable prod for faster renders
//enableProdMode();

import { MainModule } from './browser.module';

export const platformRef = platformUniversalDynamic();

// on document ready bootstrap Angular 2
export function main() {
  // Load fonts async
  // https://github.com/typekit/webfontloader#configuration
  loadWebFont({
    google: {
      families: ['Droid Sans']
    }
  });

  return platformRef.bootstrapModule(MainModule);
}

// support async tag or hmr
bootloader(main);
