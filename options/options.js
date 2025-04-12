/**
 * 网页金句卡片生成器 - 设置页面脚本
 * 实现设置的保存和加载功能
 */

// 获取DOM元素
const defaultTemplate = document.getElementById('default-template');
const defaultBgColor = document.getElementById('default-bg-color');
const defaultFontFamily = document.getElementById('default-font-family');
const defaultFontSize = document.getElementById('default-font-size');
const fontSizeValue = document.getElementById('font-size-value');
const defaultFontColor = document.getElementById('default-font-color');
const defaultExportFormat = document.getElementById('default-export-format');
const defaultExportResolution = document.getElementById('default-export-resolution');
const autoAddSource = document.getElementById('auto-add-source');
const defaultSourceTemplate = document.getElementById('default-source-template');
const saveBtn = document.getElementById('save-btn');
const resetBtn = document.getElementById('reset-btn');

// 默认设置
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

// 初始化
function init() {
  // 加载保存的设置
  loadSettings();
  
  // 绑定事件监听器
  bindEventListeners();
}

// 绑定事件监听器
function bindEventListeners() {
  // 字体大小滑块事件
  defaultFontSize.addEventListener('input', () => {
    fontSizeValue.textContent = `${defaultFontSize.value}px`;
  });
  
  // 保存按钮事件
  saveBtn.addEventListener('click', saveSettings);
  
  // 重置按钮事件
  resetBtn.addEventListener('click', resetSettings);
}

// 保存设置
function saveSettings() {
  const settings = {
    template: defaultTemplate.value,
    bgColor: defaultBgColor.value,
    fontFamily: defaultFontFamily.value,
    fontSize: defaultFontSize.value,
    fontColor: defaultFontColor.value,
    exportFormat: defaultExportFormat.value,
    exportResolution: defaultExportResolution.value,
    autoAddSource: autoAddSource.checked,
    sourceTemplate: defaultSourceTemplate.value
  };
  
  // 保存到Chrome存储
  chrome.storage.local.set({ defaultSettings: settings }, () => {
    // 显示保存成功提示
    showMessage('设置已保存');
  });
}

// 加载设置
function loadSettings() {
  chrome.storage.local.get('defaultSettings', (result) => {
    const settings = result.defaultSettings || defaultSettings;
    
    // 应用保存的设置
    defaultTemplate.value = settings.template || defaultSettings.template;
    defaultBgColor.value = settings.bgColor || defaultSettings.bgColor;
    defaultFontFamily.value = settings.fontFamily || defaultSettings.fontFamily;
    defaultFontSize.value = settings.fontSize || defaultSettings.fontSize;
    fontSizeValue.textContent = `${defaultFontSize.value}px`;
    defaultFontColor.value = settings.fontColor || defaultSettings.fontColor;
    defaultExportFormat.value = settings.exportFormat || defaultSettings.exportFormat;
    defaultExportResolution.value = settings.exportResolution || defaultSettings.exportResolution;
    autoAddSource.checked = settings.autoAddSource || defaultSettings.autoAddSource;
    defaultSourceTemplate.value = settings.sourceTemplate || defaultSettings.sourceTemplate;
  });
}

// 重置设置
function resetSettings() {
  // 应用默认设置
  defaultTemplate.value = defaultSettings.template;
  defaultBgColor.value = defaultSettings.bgColor;
  defaultFontFamily.value = defaultSettings.fontFamily;
  defaultFontSize.value = defaultSettings.fontSize;
  fontSizeValue.textContent = `${defaultFontSize.value}px`;
  defaultFontColor.value = defaultSettings.fontColor;
  defaultExportFormat.value = defaultSettings.exportFormat;
  defaultExportResolution.value = defaultSettings.exportResolution;
  autoAddSource.checked = defaultSettings.autoAddSource;
  defaultSourceTemplate.value = defaultSettings.sourceTemplate;
  
  // 保存默认设置
  chrome.storage.local.set({ defaultSettings }, () => {
    // 显示重置成功提示
    showMessage('设置已重置为默认值');
  });
}

// 显示消息提示
function showMessage(message) {
  // 检查是否已存在消息元素
  let messageElement = document.querySelector('.message');
  
  if (!messageElement) {
    // 创建消息元素
    messageElement = document.createElement('div');
    messageElement.className = 'message';
    document.body.appendChild(messageElement);
    
    // 添加消息样式
    const style = document.createElement('style');
    style.textContent = `
      .message {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #4F46E5;
        color: white;
        padding: 10px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 1000;
      }
      
      .message.show {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }
  
  // 设置消息内容
  messageElement.textContent = message;
  
  // 显示消息
  messageElement.classList.add('show');
  
  // 3秒后隐藏消息
  setTimeout(() => {
    messageElement.classList.remove('show');
  }, 3000);
}

// 初始化应用
document.addEventListener('DOMContentLoaded', init);