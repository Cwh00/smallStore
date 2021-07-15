import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import { Swipe, SwipeItem, Lazyload, Badge, Tab, Tabs,
         Collapse, CollapseItem, Sidebar, SidebarItem,
         Card, Image as VanImage,ImagePreview, tag, button,
         ActionBar, ActionBarIcon, ActionBarButton, Form, Field,
         CellGroup, Stepper, Checkbox, CheckboxGroup, SwipeCell,
         SubmitBar,Toast
        } from 'vant'

createApp(App)
    .use(Swipe).use(SwipeItem)
    .use(Lazyload,{
        lazyComponent: true,
        loading: require('./assets/images/loading.png'),
        error: require('./assets/images/loaderr.png')
    })
    .use(Badge)
    .use(Tab).use(Tabs).use(Collapse).use(CollapseItem)
    .use(Sidebar).use(SidebarItem).use(Card)
    .use(VanImage).use(ImagePreview).use(tag).use(button)
    .use(ActionBar).use(ActionBarIcon).use(ActionBarButton)
    .use(Form).use(Field).use(CellGroup).use(Stepper)
    .use(Checkbox).use(CheckboxGroup).use(SwipeCell)
    .use(SubmitBar).use(Toast)
    .use(store).use(router).mount('#app')
