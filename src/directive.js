export default {
  bind(root, { arg, modifiers }, vnode) {
    const property = arg ? arg : 'active';

    root._aehdlr_ = event => {
      if (property in vnode.context) {
        const apply = () => (
          vnode.context[property] = event.target === root || root.contains(event.target)
        )

        if (modifiers.async)
          setTimeout(apply, 0)
        else
          apply();
      }
    }

    root.addEventListener('focusin', root._aehdlr_);
    root.addEventListener('focusout', root._aehdlr_);
    document.addEventListener('click', root._aehdlr_);
  },

  unbind(root) {
    if (root._aehdlr_) {
       root.removeEventListener('focusin', root._aehdlr_);
      root.removeEventListener('focusout', root._aehdlr_);
      document.removeEventListener('click', root._aehdlr_);
      delete root._aehdlr_;
    }
  }
}
