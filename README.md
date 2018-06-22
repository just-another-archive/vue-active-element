# vue-active-element
## what
a very candide fragment component for Vue.js

## why
If you want to know if your user clicked on your element and get a boolean for it, it's sure easy ; if you want to know is that element lost user click-focus, it's a bit different. You may succeed in few lines, but why not a handy directive instead ?

### How
The directive uses `argument` to get the reactive property to update from the vnode context, so it's actually possible to put this directive and update "parent" nodes.

### Use
-  download the package `npm i -s vue-active-element`

From here, you can load a plugin version, or use the directive independently.

- Plugin: 
    ```
    import ActiveElement from 'vue-fragments'
    Vue.use(ActiveElement.Plugin)

    …

    export const MyComponent {
      template: '
      <div class="component">
        <div class="nested-child" v-active-element:property></div>
      </v-fragment>
      ',
      data() { return { property: undefined }}
    }
    ```

- Component:
    ```
    import AE from 'vue-active-element'

    export const MyComponent {
      directives: { isclick: AE.directive },
      template: '
      <div class="component">
        <div class="nested-child" v-isclick:property></div>
      </v-fragment>
      ',
      data() { return { property: undefined }}
    }
    ```
