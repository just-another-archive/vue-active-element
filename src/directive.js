export default {
  bind(root, { expression }, vnode) {
    const property = expression ? expression : 'active';

    root._aehdlr_ = {
      click : e => {
        const state = e.target === root || root.contains(e.target)

        if (property in vnode.context)
          return typeof vnode.context[property] === 'function'
            ? vnode.context[property](state)
            : vnode.context[property] = state
      },
      focusin : e => {
        if (property in vnode.context)
          return typeof vnode.context[property] === 'function'
            ? vnode.context[property](true)
            : vnode.context[property] = true
      },
      focusout: e => {
        const state = e.target === root || root.contains(e.target)

        if (property in vnode.context)
          return typeof vnode.context[property] === 'function'
            ? vnode.context[property](state)
            : vnode.context[property] = state
      },
    }

    root.addEventListener('focusin', root._aehdlr_.focusin);
    root.addEventListener('focusout', root._aehdlr_.focusout);
    document.addEventListener('click', root._aehdlr_.click);
  },

  unbind(root) {
    if (root._aehdlr_) {
      root.removeEventListener('focusin', root._aehdlr_.focusin);
      root.removeEventListener('focusout', root._aehdlr_.focusout);
      document.removeEventListener('click', root._aehdlr_.click);
      delete root._aehdlr_;
    }
  }
}
