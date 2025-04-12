/**
 * 网页金句卡片生成器 - Service Worker
 * 处理扩展的后台逻辑
 */

// 监听安装事件
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // 首次安装时初始化默认设置
    const defaultSettings = {
      template: 'simple',
      bgColor: '#ffffff',
      fontFamily: 'Microsoft YaHei, sans-serif',
      fontSize: '18',
      fontColor: '#000000',
      exportFormat: 'png',
      exportResolution: 'standard',
      autoAddSource: false,
      sourceTemplate: ''
    };
    
    // 保存默认设置到存储
    chrome.storage.local.set({ defaultSettings }, () => {
      console.log('默认设置已初始化');
    });
    
    // 打开欢迎页面或设置页面
    chrome.tabs.create({
      url: 'options/options.html'
    });
  }
});

// 监听消息事件
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 处理来自弹出窗口或选项页面的消息
  if (message.action === 'getSettings') {
    chrome.storage.local.get(['defaultSettings', 'settings'], (result) => {
      sendResponse({
        defaultSettings: result.defaultSettings,
        settings: result.settings
      });
    });
    return true; // 异步响应
  }
  
  // 处理导出图片请求
  if (message.action === 'exportImage') {
    // 使用chrome.downloads API保存图片
    chrome.downloads.download({
      url: message.dataUrl,
      filename: message.filename,
      saveAs: true
    }, (downloadId) => {
      sendResponse({ success: true, downloadId });
    });
    return true; // 异步响应
  }
});

// 监听存储变化事件
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local') {
    console.log('存储已更新:', changes);
  }
});

// 保持Service Worker活跃
self.addEventListener('fetch', (event) => {
  // 这里不需要做任何事情，只是为了保持Service Worker活跃
});