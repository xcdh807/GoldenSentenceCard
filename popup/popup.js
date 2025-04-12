/**
 * 网页金句卡片生成器 - 弹出窗口脚本
 * 实现文本输入、样式选择、预览和导出功能
 */

// 获取DOM元素
const textInput = document.getElementById('text-input');
const bgColor = document.getElementById('bg-color');
const gradientSelect = document.getElementById('gradient-select');
const fontFamily = document.getElementById('font-family');
const fontSize = document.getElementById('font-size');
const fontSizeValue = document.getElementById('font-size-value');
const fontColor = document.getElementById('font-color');
const showSource = document.getElementById('show-source');
const sourceText = document.getElementById('source-text');
const previewText = document.getElementById('preview-text');
const previewSource = document.getElementById('preview-source');
const cardPreview = document.getElementById('card-preview');
const exportFormat = document.getElementById('export-format');
const exportResolution = document.getElementById('export-resolution');
const exportBtn = document.getElementById('export-btn');
const templateOptions = document.querySelectorAll('.template-option');

// 当前选中的模板
let currentTemplate = 'simple';

// 初始化
function init() {
  // 加载保存的设置
  loadSettings();
  
  // 设置默认模板
  setTemplate('simple');
  
  // 更新预览
  updatePreview();
  
  // 绑定事件监听器
  bindEventListeners();
}

// 绑定事件监听器
function bindEventListeners() {
  // 文本输入事件
  textInput.addEventListener('input', updatePreview);
  
  // 样式选择事件
  bgColor.addEventListener('input', updatePreview);
  gradientSelect.addEventListener('change', updatePreview);
  fontFamily.addEventListener('change', updatePreview);
  fontSize.addEventListener('input', () => {
    fontSizeValue.textContent = `${fontSize.value}px`;
    updatePreview();
  });
  fontColor.addEventListener('input', updatePreview);
  
  // 来源信息事件
  showSource.addEventListener('change', () => {
    sourceText.disabled = !showSource.checked;
    updatePreview();
  });
  sourceText.addEventListener('input', updatePreview);
  
  // 模板选择事件
  templateOptions.forEach(option => {
    option.addEventListener('click', () => {
      const template = option.getAttribute('data-template');
      setTemplate(template);
      updatePreview();
    });
  });
  
  // 导出按钮事件
  exportBtn.addEventListener('click', exportCard);
}

// 设置模板
function setTemplate(template) {
  // 移除之前选中的模板
  templateOptions.forEach(option => {
    option.classList.remove('active');
    if (option.getAttribute('data-template') === template) {
      option.classList.add('active');
    }
  });
  
  currentTemplate = template;
  
  // 根据模板设置样式
  switch (template) {
    case 'simple':
      bgColor.value = '#ffffff';
      fontFamily.value = 'Microsoft YaHei, sans-serif';
      fontSize.value = '18';
      fontSizeValue.textContent = '18px';
      fontColor.value = '#000000';
      gradientSelect.value = 'none';
      break;
    case 'literary':
      bgColor.value = '#f8f5e6';
      fontFamily.value = 'KaiTi, serif';
      fontSize.value = '20';
      fontSizeValue.textContent = '20px';
      fontColor.value = '#8b4513';
      gradientSelect.value = 'none';
      break;
    case 'business':
      bgColor.value = '#f0f4f8';
      fontFamily.value = 'SimHei, sans-serif';
      fontSize.value = '18';
      fontSizeValue.textContent = '18px';
      fontColor.value = '#2c3e50';
      gradientSelect.value = 'none';
      break;
    case 'colorful':
      bgColor.value = '#f6d365';
      fontFamily.value = 'Microsoft YaHei, sans-serif';
      fontSize.value = '18';
      fontSizeValue.textContent = '18px';
      fontColor.value = '#ffffff';
      gradientSelect.value = 'gradient1';
      break;
    case 'dark':
      bgColor.value = '#2d3748';
      fontFamily.value = 'SimSun, serif';
      fontSize.value = '18';
      fontSizeValue.textContent = '18px';
      fontColor.value = '#e2e8f0';
      gradientSelect.value = 'none';
      break;
  }
}

// 更新预览
function updatePreview() {
  // 设置文本内容
  previewText.textContent = textInput.value || '在此输入您想要制作成卡片的文字...';
  
  // 设置来源信息
  if (showSource.checked && sourceText.value) {
    previewSource.textContent = `—— ${sourceText.value}`;
    previewSource.style.display = 'block';
  } else {
    previewSource.style.display = 'none';
  }
  
  // 设置样式
  previewText.style.fontFamily = fontFamily.value;
  previewText.style.fontSize = `${fontSize.value}px`;
  previewText.style.color = fontColor.value;
  
  // 设置背景
  if (gradientSelect.value === 'none') {
    cardPreview.style.background = bgColor.value;
  } else {
    switch (gradientSelect.value) {
      case 'gradient1':
        cardPreview.style.background = 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)';
        break;
      case 'gradient2':
        cardPreview.style.background = 'linear-gradient(135deg, #F97316 0%, #EC4899 100%)';
        break;
      case 'gradient3':
        cardPreview.style.background = 'linear-gradient(135deg, #10B981 0%, #0EA5E9 100%)';
        break;
    }
  }
  
  // 保存设置
  saveSettings();
}

// 导出卡片为图片
function exportCard() {
  // 创建Canvas元素
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // 设置Canvas尺寸
  const scale = exportResolution.value === 'hd' ? 2 : 1;
  const width = 240 * scale;
  const height = 320 * scale;
  
  canvas.width = width;
  canvas.height = height;
  
  // 绘制背景
  if (gradientSelect.value === 'none') {
    ctx.fillStyle = bgColor.value;
    ctx.fillRect(0, 0, width, height);
  } else {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    
    switch (gradientSelect.value) {
      case 'gradient1':
        gradient.addColorStop(0, '#4F46E5');
        gradient.addColorStop(1, '#7C3AED');
        break;
      case 'gradient2':
        gradient.addColorStop(0, '#F97316');
        gradient.addColorStop(1, '#EC4899');
        break;
      case 'gradient3':
        gradient.addColorStop(0, '#10B981');
        gradient.addColorStop(1, '#0EA5E9');
        break;
    }
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  // 绘制文本
  const text = textInput.value || '在此输入您想要制作成卡片的文字...';
  ctx.font = `${parseInt(fontSize.value) * scale}px ${fontFamily.value}`;
  ctx.fillStyle = fontColor.value;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // 文本换行处理
  const maxWidth = width - 40 * scale;
  const lineHeight = parseInt(fontSize.value) * 1.5 * scale;
  const lines = getTextLines(ctx, text, maxWidth);
  
  // 计算文本总高度
  const textHeight = lines.length * lineHeight;
  
  // 绘制每一行文本
  let y = (height - textHeight) / 2;
  lines.forEach(line => {
    ctx.fillText(line, width / 2, y + lineHeight / 2);
    y += lineHeight;
  });
  
  // 绘制来源信息
  if (showSource.checked && sourceText.value) {
    const source = `—— ${sourceText.value}`;
    ctx.font = `${12 * scale}px ${fontFamily.value}`;
    ctx.fillStyle = fontColor.value;
    ctx.textAlign = 'right';
    ctx.fillText(source, width - 20 * scale, height - 20 * scale);
  }
  
  // 导出图片
  const format = exportFormat.value;
  const dataURL = canvas.toDataURL(`image/${format}`, 1.0);
  
  // 创建下载链接
  const link = document.createElement('a');
  link.download = `金句卡片_${new Date().getTime()}.${format}`;
  link.href = dataURL;
  link.click();
}

// 获取文本换行后的行数组
function getTextLines(ctx, text, maxWidth) {
  const words = text.split('');
  const lines = [];
  let currentLine = '';
  
  for (let i = 0; i < words.length; i++) {
    const testLine = currentLine + words[i];
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    
    if (testWidth > maxWidth && i > 0) {
      lines.push(currentLine);
      currentLine = words[i];
    } else {
      currentLine = testLine;
    }
  }
  
  lines.push(currentLine);
  return lines;
}

// 保存设置到本地存储
function saveSettings() {
  const settings = {
    template: currentTemplate,
    bgColor: bgColor.value,
    gradient: gradientSelect.value,
    fontFamily: fontFamily.value,
    fontSize: fontSize.value,
    fontColor: fontColor.value,
    showSource: showSource.checked,
    exportFormat: exportFormat.value,
    exportResolution: exportResolution.value
  };
  
  chrome.storage.local.set({ settings });
}

// 从本地存储加载设置
function loadSettings() {
  chrome.storage.local.get('settings', (result) => {
    if (result.settings) {
      const settings = result.settings;
      
      // 应用保存的设置
      currentTemplate = settings.template || 'simple';
      bgColor.value = settings.bgColor || '#ffffff';
      gradientSelect.value = settings.gradient || 'none';
      fontFamily.value = settings.fontFamily || 'Microsoft YaHei, sans-serif';
      fontSize.value = settings.fontSize || '18';
      fontSizeValue.textContent = `${fontSize.value}px`;
      fontColor.value = settings.fontColor || '#000000';
      showSource.checked = settings.showSource || false;
      sourceText.disabled = !showSource.checked;
      exportFormat.value = settings.exportFormat || 'png';
      exportResolution.value = settings.exportResolution || 'standard';
      
      // 设置模板
      setTemplate(currentTemplate);
    }
  });
}

// 初始化应用
document.addEventListener('DOMContentLoaded', init);