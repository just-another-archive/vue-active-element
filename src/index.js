import directive from './directive'

export default {
  directive,
  Plugin: {
    install: function(Vue) {
      Vue.directive('active-element', directive)
      Vue.directive('ae', directive)
    }
  }
}
