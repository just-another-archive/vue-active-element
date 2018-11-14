export default {
  bind(root, { arg }, vnode) {
    const property = arg ? arg : 'active';

    root._aehdlr_ = {
      click : e => {
        if (property in vnode.context)
          vnode.context[property] = e.target === root || root.contains(e.target)
      },
      focusin : e => {
        if (property in vnode.context)
          vnode.context[property] = true
      },
      focusout: e => {
        if (property in vnode.context && vnode.context[property])
          vnode.context[property] = e.target === root || root.contains(e.target)
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
