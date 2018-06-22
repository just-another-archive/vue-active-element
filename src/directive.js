export default {
  bind(root, { arg }, vnode) {
    const property = arg ? arg : 'active';
    
    root._aehdlr_ = event => {
      if (property in vnode.context) {
        vnode.context[property] = event.target === root || root.contains(event.target);      
      }
    }
    
    document.addEventListener('click', root._aehdlr_)
  },
  
  unbind(root) {
    if (root._aehdlr_) {
      document.removeEventListener('click', root._aehdlr_);
      delete root._aehdlr_;
    }
  }
}
