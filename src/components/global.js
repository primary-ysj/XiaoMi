/**
 * 借助webpack使用require.context()方法创建自己的(模块)上下文，从而实现自动动态require组件。
 * 该方法需要三个参数：要搜索的文件夹目录、是否还搜索他的子目录，一个匹配文件的正则表达式
 * 在main.js里引入当前文件
 */
import Vue from 'vue'

// function capitalizeFirstLetter(string) {
// return string.charAt(0).toUpperCase() + string.slice(1) //对声明的组件名进行格式调整
// }

// const requireComponent = require.context('./', false, /\.vue$/) // 找到components文件夹下以.vue命名的文件
// console.dir(requireComponent);
// requireComponent.keys().map(fileName => {
//     console.log(fileName);
//     const componentConfig = requireComponent(fileName)
//         // console.log(componentConfig);
//         // 因为得到的filename格式是: './baseButton.vue', 所以这里我们去掉头和尾，只保留真正的文件名
//     const name = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
//         // const componentName = capitalizeFirstLetter(name) 如果就是以自己文件名为组件名,可以不进行格式调整,直接声明
//     Vue.component(name, componentConfig.default || componentConfig)
// })

// 如果components下面有目录时使用
// import Vue from 'vue'

const requireComponent = require.context('./', true, /\.vue$/) // 获取当前目录下以.vue结束的文件的文件模块 本身是一个函数,接收文件路径,返回文件模块

const requireAll = requireComponent.keys().map(item => requireComponent(item)) //获取所有的文件模块
    // console.log(requireAll);
requireAll.forEach(item => {
    // console.log(item);
    if (item.default.name) {
        // let uname = item.default.__file
        // console.log(uname);
        // uname = uname.replace(/\.\w+$/, '')
        // console.log(uname);

        // uname = uname.substr(uname.lastIndexOf('/') + 1)
        // console.log(uname);
        let uname = item.default.name
            // console.log(uname);
        Vue.component(uname, item.default)
    }
})

// const requireAll = context => context.keys().map(context)
//     // console.log(context);
// console.dir(requireAll);

// requireAll(requireComponent).forEach(item => {
//     console.log(item);
//     if (item.default.__file) {
//         let uname = item.default.__file
//         console.log(uname);
//         uname = uname.replace(/\.\w+$/, '')
//         uname = uname.substr(uname.lastIndexOf('/') + 1)
//         console.log(uname);
//         Vue.component(uname, item.default)
//     }
// })