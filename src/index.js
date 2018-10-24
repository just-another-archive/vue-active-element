import d from './directive'

export const directive = d

export const Plugin = {
  install: function(Vue) {
    Vue.directive('active-element', d)
    Vue.directive('ae', d)
  }
}

export default {
  directive, Plugin,
}
