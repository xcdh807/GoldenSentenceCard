# 网页金句卡片生成器 - Chrome浏览器扩展

## 项目概述

网页金句卡片生成器是一款Chrome浏览器扩展，允许用户将网页中的精彩文字内容转换为精美的图片卡片。用户可以自定义卡片样式，并将生成的图片保存到本地或分享到社交媒体平台。

## 功能特点

### 1. 文本获取
- 用户可以在网页中复制文字内容，并在插件弹出窗口中粘贴
- 支持手动编辑粘贴的文本，调整格式

### 2. 卡片生成
- 默认生成竖版卡片，高度自适应文本内容
- 提供多种预设卡片模板（简约、文艺、商务等风格）
- 支持自定义卡片背景颜色或选择预设的渐变色背景
- 支持调整字体大小、颜色和字体类型
- 可选择是否在卡片底部添加文本来源信息

### 3. 图片导出
- 支持将生成的卡片导出为PNG、JPG格式
- 提供不同分辨率选项（标准、高清）
- 支持一键保存到本地

## 使用方法

1. 在Chrome浏览器中安装扩展
2. 在网页中选择并复制喜欢的文字内容
3. 点击浏览器工具栏中的扩展图标，打开弹出窗口
4. 在文本输入框中粘贴或输入文字
5. 选择喜欢的卡片模板和样式
6. 预览效果并调整设置
7. 点击导出按钮，将卡片保存为图片

## 技术架构

本扩展基于Chrome扩展Manifest V3开发，主要技术组件包括：

- **Manifest V3**：使用最新的Chrome扩展开发标准
- **Service Worker**：替代Background Pages，处理后台逻辑
- **HTML Canvas**：用于图片渲染和导出
- **响应式设计**：确保在不同分辨率下的良好体验
- **离线功能**：所有功能在离线状态下也能正常工作

## 项目结构

```
├── manifest.json          # 扩展配置文件
├── popup/                 # 弹出窗口相关文件
│   ├── popup.html         # 弹出窗口HTML
│   ├── popup.css          # 弹出窗口样式
│   └── popup.js           # 弹出窗口脚本
├── options/               # 设置页面相关文件
│   ├── options.html       # 设置页面HTML
│   ├── options.css        # 设置页面样式
│   └── options.js         # 设置页面脚本
├── service-worker.js      # Service Worker脚本
├── assets/                # 静态资源
│   ├── images/            # 图片资源
│   └── templates/         # 卡片模板
└── utils/                 # 工具函数
    ├── canvas.js          # Canvas绘图相关
    └── storage.js         # 存储相关
```

## 安装方法

### 从Chrome Web Store安装
1. 访问Chrome Web Store
2. 搜索"网页金句卡片生成器

## 环境变量配置

本项目使用环境变量来存储敏感信息，如API密钥。以下是配置步骤：

### 本地开发环境

1. 复制`.env.example`文件并重命名为`.env`
2. 在`.env`文件中填入您的DeepSeek API密钥和其他配置

```
DEEPSEEK_API_KEY=your_api_key_here
DEEPSEEK_API_URL=https://ark.cn-beijing.volces.com/api/v3/chat/completions
PORT=3000
```

### Vercel部署配置

在Vercel部署时，需要在项目设置中添加以下环境变量：

1. 登录Vercel账户并进入您的项目
2. 点击「Settings」→「Environment Variables」
3. 添加以下环境变量：
   - `DEEPSEEK_API_KEY`: 您的DeepSeek API密钥
   - `DEEPSEEK_API_URL`: DeepSeek API的URL地址
   - `PORT`: 服务器端口（Vercel会自动分配端口，可选）