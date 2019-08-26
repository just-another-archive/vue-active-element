export default {
  bind(root, { modifiers, expression = 'active', value }, { context }) {
    const property = value in context ? value : expression

    const set = state => {
      if (property in context)
        return context[property] instanceof Function
          ? context[property](state)
          : context[property] = state

      return false
    }

    // _ Active Element HaNDLeR
    root._aehdlr_ = {
      click: e => {
        const value = (e.target === root || root.contains(e.target))

        if (modifiers.toggle && context[property] && value)
          return set(false)

        return set(value)
      },
      focusin : () => set(true),
      focusout: () => set(false),
    }

    if (modifiers.partial !== true) {
      root.addEventListener('focusin', root._aehdlr_.focusin)
      root.addEventListener('focusout', root._aehdlr_.focusout)
    }
    else {
      delete root._aehdlr_.focusin
      delete root._aehdlr_.focusout
    }

    document.addEventListener('click', root._aehdlr_.click)
    document.addEventListener('touchstart', root._aehdlr_.click)
  },

  unbind(root) {
    if (root._aehdlr_ && root._aehdlr_.focusin)
      root.removeEventListener('focusin', root._aehdlr_.focusin)

    if (root._aehdlr_ && root._aehdlr_.focusout)
      root.removeEventListener('focusout', root._aehdlr_.focusout)

    if (root._aehdlr_ && root._aehdlr_.click) {
      document.removeEventListener('click', root._aehdlr_.click)
      document.removeEventListener('touchstart', root._aehdlr_.click)
    }

    if (root._aehdlr_)
      delete root._aehdlr_
  }
}
