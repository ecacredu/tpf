/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  // Your custom JavaScript goes here

  document.body.addEventListener("mousemove", function(event) {
        //Check if we are in the top area of the page.
        console.log(event.clientY);
        if(event.clientY < 70) {
            //Do something here.
            if( $("#storyIndex").css('top') != 0) {
              $( "#storyIndex" ).stop().animate({
                    top: 0
                }, 300, function() {
                    // Animation complete.
                });
            }
        }else{
            if( $("#storyIndex").css('top') != 75) {
                $( "#storyIndex" ).stop().animate({
                        top: -70
                    }, 300, function() {
                        // Animation complete.
                    });
            }
        }

    });

    var controller = new ScrollMagic.Controller();

    var section1Tween = new TweenMax.to('#section1 .mdl-cell', 1.5, {
        opacity: 1
    });
    var section1TweenReverse = new TweenMax.to('#section1 .mdl-cell', 1.5, {
        opacity: 0
    });

    var sec2timeline = new TimelineLite()
    .add([TweenMax.to('#section2 .mdl-cell', 1.5, {
        opacity: 1
    }),TweenMax.to('#section2 .left img', 1.5, {
        'margin-left': 0,
        'margin-top':'10%'
    })]);

    var sec2timelineReverse = new TimelineLite()
    .add([TweenMax.to('#section2 .mdl-cell', 1.5, {
        opacity: 0
    }),TweenMax.to('#section2 .left img', 1.5, {
        'margin-left': '-10%',
        'margin-top':'20%'
    })]);

    var sec3timeline = new TimelineLite()
    .add([TweenMax.to('#section3 .mdl-cell', 1.5, {
        opacity: 1
    }),TweenMax.to('#section3 .right img', 1.5, {
        'margin-left': 0,
        'margin-top':'10%'
    })]);

    var sec3timelineReverse = new TimelineLite()
    .add([TweenMax.to('#section3 .mdl-cell', 1.5, {
        opacity: 0
    }),TweenMax.to('#section3 .right img', 1.5, {
        'margin-left': '10%',
        'margin-top':'20%'
    })]);

    var sec4timeline = new TimelineLite()
    .add([TweenMax.to('#section4 .mdl-cell', 1.5, {
        opacity: 1
    }),TweenMax.to('#section4 .left img', 1.5, {
        'margin-left': 0,
        'margin-top':'10%'
    })]);

    var sec4timelineReverse = new TimelineLite()
    .add([TweenMax.to('#section4 .mdl-cell', 1.5, {
        opacity: 0
    }),TweenMax.to('#section4 .left img', 1.5, {
        'margin-left': '-10%',
        'margin-top':'20%'
    })]);

    var section5Tween = new TweenMax.to('#section5 .mdl-cell', 1.5, {
        opacity: 1
    });

    var container1Scene = new ScrollMagic.Scene({
        triggerElement: '#section1'
    })
    .setTween(section1Tween);
    // .addIndicators();

    

    var container2Scene = new ScrollMagic.Scene({
        triggerElement: '#section2'
    })
    .setTween([sec2timeline,section1TweenReverse]);
    // .addIndicators();

    var container3Scene = new ScrollMagic.Scene({
        triggerElement: '#section3'
    })
    .setTween([sec3timeline,sec2timelineReverse]);
    // .addIndicators();

    var container4Scene = new ScrollMagic.Scene({
        triggerElement: '#section4'
    })
    .setTween([sec4timeline,sec3timelineReverse]);
    // .addIndicators();

    var container5Scene = new ScrollMagic.Scene({
        triggerElement: '#section5',
        offset: 50
    })
    .setTween([section5Tween,sec4timelineReverse]);
    // .addIndicators();

    controller.addScene([
    container1Scene,
    container2Scene,
    container3Scene,
    container4Scene,
    container5Scene
    ]);

})();
