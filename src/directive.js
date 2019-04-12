export default {
  bind(root, { modifiers, expression = 'active' }, vnode) {
    root._aehdlr_ = {
      click : e => {
        const state = e.target === root || root.contains(e.target)

        if (expression in vnode.context)
          return vnode.context[expression] instanceof Function
            ? vnode.context[expression](state)
            : vnode.context[expression] = state
      },

      focusin : e => {
        if (expression in vnode.context)
          return vnode.context[expression] instanceof Function
            ? vnode.context[expression](true)
            : vnode.context[expression] = true
      },

      focusout: e => {
        if (expression in vnode.context)
          return vnode.context[expression] instanceof Function
            ? vnode.context[expression](false)
            : vnode.context[expression] = false
      },
    }

    if (modifiers.partial !== true) {
      root.addEventListener('focusin', root._aehdlr_.focusin);
      root.addEventListener('focusout', root._aehdlr_.focusout);
    }
    else {
      delete root._aehdlr_.focusin;
      delete root._aehdlr_.focusout;
    }

    document.addEventListener('click', root._aehdlr_.click);
  },

  unbind(root) {
    if (root._aehdlr_ && root._aehdlr_.focusin)
      root.removeEventListener('focusin', root._aehdlr_.focusin);

    if (root._aehdlr_ && root._aehdlr_.focusout)
      root.removeEventListener('focusout', root._aehdlr_.focusout);

    if (root._aehdlr_ && root._aehdlr_.click)
      document.removeEventListener('click', root._aehdlr_.click);

    if (root._aehdlr_)
      delete root._aehdlr_;
  }
}
