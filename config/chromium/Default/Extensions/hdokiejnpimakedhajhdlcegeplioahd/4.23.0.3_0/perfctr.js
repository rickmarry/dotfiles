var LPctr=new LPctr_lib;function init_LPctr(){LPctr||(LPctr=new LPctr_lib)}function LPCTR(t){var e=0;if("undefined"!=typeof g_isdebug&&g_isdebug||"undefined"!=typeof debug&&debug){init_LPctr();e=LPctr.increment(t)}return 0!==e}function LPctr_lib(){var t=this;this.timestamp=function(){return(new Date).getTime()};t.timestamp();var e={};this.reset_all=function(){({}),t.timestamp()},this.increment=function(i){return i?(void 0===e[i]?e[i]=1:"number"==typeof e[i]&&(e[i],1)&&(e[i]>=2147483647?e[i]=1:e[i]++,t.timestamp()),e[i]):0},this.get=function(t){return t&&void 0!==e[t]?e[t]:0},this.clear=function(t){return!(!t||"number"!=typeof e[t]||(e[t],0))&&delete e[t]},this.start_timer=function(i){return i?(e[i]={start:t.timestamp(),stop:0},e[i].start):0},this.stop_timer=function(i){return i&&void 0!==e[i]?(e[i].stop=t.timestamp(),e[i].stop):0},this.get_timer=function(t){if(t&&void 0!==e[t]){var i=e[t].start,r=e[t].stop;return isNaN(i)||isNaN(r)||null===i||null===r||void 0===i||void 0===r||i>r?0:r-i}return 0},this.clear_timer=function(e){return t.reset_timer(e)},this.reset_timer=function(t){return!!t&&(e[t]=0,!0)}}
//# sourceMappingURL=sourcemaps/perfctr.js.map