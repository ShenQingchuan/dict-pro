# Dict-Pro 专业英语小助手

## 技术栈

- Egg.js：采用较为企业级的 Node.js 框架
- MongoDB 4：采用结构化较为宽松的 NoSQL 数据库
- React 16.x hooks：采用了 TypeScript 模式开发，并纯使用函数式组件和 Hooks，并没有引入 Redux，尝试缩小项目体积，但不排除根据需要后续引入 React-Redux
- ECDict：[点击此处访问该词典项目的 Github 官方仓库](https://github.com/skywind3000/ecdict)

## 开发时所用脚本命令

在项目根目录, 使用下方命令启动:

### `yarn start`

使用开发者模式运行该项目的前端。<br />
打开 [http://localhost:3000](http://localhost:3000) 来查看显示的效果。

编辑代码时会热刷新。<br />
同时代码格式 error 也会展示出来。

### `yarn test`

在可交互模式下运行测试用例。<br />
查看 Facebook 的测试指导文档[running tests](https://facebook.github.io/create-react-app/docs/running-tests)查看更多信息。

### `yarn build`

打包整个项目到 `build` 文件夹。<br />
它会正确地打包本项目的 React 前端部分，优化到最好的性能表现。

文件名上会加上 hash。<br />
之后前端部分就可以部署啦。
