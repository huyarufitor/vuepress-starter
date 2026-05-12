# LiberLive 音乐内容与设备运营中台
## 项目描述
面向音乐内容运营、设备版本管理和业务配置的综合后台系统，承担平台数据看板、内容资产管理、曲谱编辑、运营活动配置、App/固件版本发布及微
前端子应用承载等职责，是连接内容运营、产品配置与硬件升级的核心管理端。

## 技术栈
Vue2、Vue Router、Vuex、Element UI、Axios、ECharts、Qiankun、qiniu-js、xlsx、@tonejs/midi
## 项目亮点
  - 不是单一 CRUD 后台，而是覆盖 内容中台 + 数据看板 + 设备版本 + 曲谱编辑 + 微前端 的综合业务平台。
  - 通过通用 CommonTable / SubmitForm / OssUpload / exportUtils 等能力沉淀，提升多模块复用性和交付效率。
  - 支持动态路由和权限菜单，便于按角色扩展后台能力。
  - 存在多维曲谱编辑、MIDI 替换、歌词和弦时间轴联动等复杂富交互能力。
  - 接入 Qiankun 作为主应用容器，具备平台横向扩展空间。
  - 主导浏览器端 DAW 级编辑器设计与交付
  （1） 主导 Web-based DAW 曲谱编辑模块建设，基于 Vue2 实现 Piano Roll、多轨旋律编排、和弦轨编辑、事件轨时序配置及歌词挂靠能力，支撑复杂音
    乐内容生产场景。
  （2）设计编辑器核心数据结构与转换链路，完成 MIDI parsing、multilingual lyrics tokenization、note alignment、chord serialization、event sequencing 等关键能力，保障编辑态与服务端数据模型一致性。
  （3） 落地 grid snapping、triplet quantization、velocity editing、drag/resize、undo/redo、keyboard shortcuts、scroll sync 等 DAW 级交
    互，在中后台技术栈下完成高复杂度富编辑器交付。
## 项目难点
  - 业务跨度大，既有音乐内容运营，又有设备固件、App 版本、灰度发布和运营配置，前端状态和表单复杂度高。
  - 曲谱编辑属于高交互场景，涉及时间轴、轨道、歌词、和弦、MIDI 数据处理，远高于普通后台表单复杂度。
  - 老技术栈下需要同时兼顾复用性、稳定性与扩展性，避免后台在业务增长后失控。
  - 微前端接入、统一加签请求、上传链路和多环境构建，提升了平台集成复杂度。

## 备注：Boss 直聘/猎聘 的短项目描述
项目名称：LiberLive 音乐内容与设备运营中台

  项目描述：负责公司音乐内容与硬件生态中台前端建设，基于 Vue2 + Element UI + Vuex + Qiankun 搭建统一后台框架，支撑内容运营、曲谱管理、
  数据看板、App 版本发布、设备 OTA 升级及多业务配置管理等核心场景，服务内容、运营、产品及硬件团队的日常协同与业务交付。

  Boss/猎聘简历三条版

  - 负责音乐内容与设备运营中台前端架构设计与核心模块交付，搭建统一权限路由、公共表格表单、上传导出、请求加签等基础能力，支撑多业务线后
    台快速复用与持续迭代。
  - 主导歌单、榜单、标签、Banner、元歌曲/元歌手、审核词、趣味音效、疗愈音等内容运营模块建设，并落地用户、设备、曲谱、视频等经营分析看
    板，提升运营配置效率与数据可视化能力。
  - 推动复杂前端场景落地，完成多维曲谱编辑器、MIDI/歌词/和弦/时间轴联动编辑，以及 App 版本管理、设备 OTA 灰度发布、机型与版本配置等关
    键能力建设，并通过微前端方案提升平台扩展性。
## 更短
 负责 LiberLive 音乐内容与设备运营中台前端建设，基于 Vue2 技术栈搭建统一后台框架，覆盖内容运营、曲谱编辑、数据看板、App 版本发布、设
备 OTA 升级和微前端接入等核心场景，主导公共能力沉淀与复杂业务模块交付，支撑多团队协同和平台持续扩展。



# p7/p8前端负责人
项目名称
  LiberLive 音乐内容与设备运营中台

  项目描述
  负责公司音乐内容与硬件生态运营中台前端建设，基于 Vue2 + Vuex + Vue Router + Element UI + Qiankun 搭建统一后台框架，覆盖内容运营、曲
  谱编辑、数据看板、App 版本管理、设备 OTA 升级、运营配置及微前端接入等核心场景，支撑内容、运营、产品及硬件团队的日常业务协同与高频配
  置交付。

  技术栈
  Vue2、Vuex、Vue Router、Element UI、Axios、ECharts、Qiankun、@tonejs/midi、qiniu-js、xlsx

  项目职责 / 亮点

  - 负责中台前端架构设计与公共能力建设，搭建统一权限路由、动态菜单、请求加签、通用表格表单、文件上传、Excel 导入导出等基础设施，提升多
    业务模块复用性与迭代效率。
  - 主导内容运营核心模块建设，覆盖歌单、榜单、标签、Banner、元歌曲/元歌手、审核词、趣味音效、疗愈音等业务线，并建设用户、设备、曲谱、
    视频、配置使用等经营分析看板，支撑运营精细化管理。
  - 推动 Qiankun 微前端主应用接入，完成子应用容器、全局状态透传、菜单与用户上下文共享、异常兜底及加载态治理，提升平台横向扩展能力。
  - 负责 App 版本管理与设备 OTA 模块交付，支持版本发布、灰度配置、最低可见版本、机型适配、升级包管理等能力，打通软件版本与硬件升级协同
    链路。
  - 主导项目中最复杂的 MultiDimen 曲谱编辑模块建设，将传统后台表单能力升级为 Web-based DAW-like Editor，支撑复杂音乐内容的可视化生产与
    编辑。

  项目难点

  - 曲谱编辑并非普通 CMS 表单，而是浏览器内的轻量级 DAW / Piano Roll Editor。前端需要同时处理 melody track、chord track、rhythm/event
    track、lyrics alignment、multi-track arrangement 等多维数据模型。
  - 基于 @tonejs/midi 实现 MIDI parsing 与内部乐谱结构转换，打通 MIDI -> melody schema -> multi-track payload 的数据链路，同时兼容音
    高、时值、力度、八度、轨道归属等维度。
  - 在 MultiDimen 模块中设计并落地 grid snapping、triplet quantization、velocity editing、drag/resize、undo/redo history、keyboard
    shortcuts、scroll synchronization 等高交互能力，接近桌面 DAW 的编辑体验。
  - 处理歌词与音符挂靠的复杂场景，支持中英文及多语种 tokenization、逐词/逐字分配、延音/跳词/换行等规则，解决 lyrics-note alignment 的
    准确性问题。
  - 多轨场景下需保证主轨、额外轨、和弦轨、事件轨在时间轴、小节增删、轨道排序、回显恢复、提交序列化上的一致性，属于典型的 state-heavy
    timeline editor 难题。
  - 在 Vue2 + Element UI 技术栈下完成富交互编辑器交付，对组件通信、状态管理、局部渲染、历史栈恢复和复杂交互性能控制要求较高。

  简历三条浓缩版

  - 负责 LiberLive 音乐内容与设备运营中台前端架构设计与核心模块交付，基于 Vue2 + Vuex + Qiankun 搭建统一后台框架，支撑内容运营、数据看
    板、版本管理、设备 OTA 与微前端扩展等多业务场景。
  - 主导歌单、榜单、标签、Banner、元歌曲/元歌手、审核词、音效及疗愈内容等运营模块建设，并落地用户、设备、曲谱、视频等经营分析看板，提
    升平台配置效率与数据可视化能力。
  - 主导 Web-based DAW 曲谱编辑模块建设，实现 Piano Roll、多轨旋律编排、和弦轨编辑、事件轨时序配置、MIDI parsing、歌词挂靠、undo/
    redo、grid snapping 等高复杂度能力，解决多模型转换与时间轴编辑一致性问题。

  更适合 Boss / 猎聘的一段式版本
  负责 LiberLive 音乐内容与设备运营中台前端建设，基于 Vue2 技术栈搭建统一后台框架，覆盖内容运营、数据看板、App 版本、设备 OTA、微前端
  接入等核心场景；主导复杂曲谱编辑模块建设，落地 Web-based DAW 能力，支持 MIDI 解析、多轨编排、和弦与事件轨编辑、歌词挂靠及时间轴交
  互，兼顾平台复用、复杂交互与业务高频交付。