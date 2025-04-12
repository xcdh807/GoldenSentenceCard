/**
 * 网页金句卡片生成器 - Canvas工具函数
 * 处理卡片渲染和导出相关功能
 */

/**
 * 创建卡片图片
 * @param {Object} options - 卡片配置选项
 * @param {string} options.text - 卡片文本内容
 * @param {string} options.source - 来源信息
 * @param {string} options.template - 模板名称
 * @param {string} options.bgColor - 背景颜色
 * @param {string} options.gradient - 渐变类型
 * @param {string} options.fontFamily - 字体
 * @param {string} options.fontSize - 字体大小
 * @param {string} options.fontColor - 字体颜色
 * @param {string} options.resolution - 导出分辨率
 * @param {string} options.format - 导出格式
 * @returns {string} 图片的Data URL
 */
export function createCardImage(options) {
  // 创建Canvas元素
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // 设置Canvas尺寸
  const scale = options.resolution === 'hd' ? 2 : 1;
  const width = 240 * scale;
  const height = 320 * scale;
  
  canvas.width = width;
  canvas.height = height;
  
  // 绘制背景
  drawBackground(ctx, width, height, options.bgColor, options.gradient, scale);
  
  // 绘制文本
  drawText(ctx, width, height, options.text, options.fontFamily, options.fontSize, options.fontColor, scale);
  
  // 绘制来源信息
  if (options.source) {
    drawSource(ctx, width, height, options.source, options.fontFamily, options.fontColor, scale);
  }
  
  // 根据模板添加额外装饰
  addTemplateDecorations(ctx, width, height, options.template, scale);
  
  // 导出图片
  return canvas.toDataURL(`image/${options.format}`, 1.0);
}

/**
 * 绘制背景
 * @param {CanvasRenderingContext2D} ctx - Canvas上下文
 * @param {number} width - 画布宽度
 * @param {number} height - 画布高度
 * @param {string} bgColor - 背景颜色
 * @param {string} gradientType - 渐变类型
 * @param {number} scale - 缩放比例
 */
function drawBackground(ctx, width, height, bgColor, gradientType, scale) {
  if (gradientType === 'none') {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
  } else {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    
    switch (gradientType) {
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
}

/**
 * 绘制文本
 * @param {CanvasRenderingContext2D} ctx - Canvas上下文
 * @param {number} width - 画布宽度
 * @param {number} height - 画布高度
 * @param {string} text - 文本内容
 * @param {string} fontFamily - 字体
 * @param {string} fontSize - 字体大小
 * @param {string} fontColor - 字体颜色
 * @param {number} scale - 缩放比例
 */
function drawText(ctx, width, height, text, fontFamily, fontSize, fontColor, scale) {
  ctx.font = `${parseInt(fontSize) * scale}px ${fontFamily}`;
  ctx.fillStyle = fontColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // 文本换行处理
  const maxWidth = width - 40 * scale;
  const lineHeight = parseInt(fontSize) * 1.5 * scale;
  const lines = getTextLines(ctx, text, maxWidth);
  
  // 计算文本总高度
  const textHeight = lines.length * lineHeight;
  
  // 绘制每一行文本
  let y = (height - textHeight) / 2;
  lines.forEach(line => {
    ctx.fillText(line, width / 2, y + lineHeight / 2);
    y += lineHeight;
  });
}

/**
 * 绘制来源信息
 * @param {CanvasRenderingContext2D} ctx - Canvas上下文
 * @param {number} width - 画布宽度
 * @param {number} height - 画布高度
 * @param {string} source - 来源信息
 * @param {string} fontFamily - 字体
 * @param {string} fontColor - 字体颜色
 * @param {number} scale - 缩放比例
 */
function drawSource(ctx, width, height, source, fontFamily, fontColor, scale) {
  const sourceText = `—— ${source}`;
  ctx.font = `${12 * scale}px ${fontFamily}`;
  ctx.fillStyle = fontColor;
  ctx.textAlign = 'right';
  ctx.fillText(sourceText, width - 20 * scale, height - 20 * scale);
}

/**
 * 根据模板添加装饰
 * @param {CanvasRenderingContext2D} ctx - Canvas上下文
 * @param {number} width - 画布宽度
 * @param {number} height - 画布高度
 * @param {string} template - 模板名称
 * @param {number} scale - 缩放比例
 */
function addTemplateDecorations(ctx, width, height, template, scale) {
  switch (template) {
    case 'simple':
      // 简约模板不添加额外装饰
      break;
    case 'literary':
      // 文艺模板添加简单装饰线
      ctx.strokeStyle = ctx.fillStyle;
      ctx.lineWidth = 1 * scale;
      ctx.beginPath();
      ctx.moveTo(20 * scale, 20 * scale);
      ctx.lineTo(40 * scale, 20 * scale);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(width - 20 * scale, height - 20 * scale);
      ctx.lineTo(width - 40 * scale, height - 20 * scale);
      ctx.stroke();
      break;
    case 'business':
      // 商务模板添加角落装饰
      ctx.strokeStyle = ctx.fillStyle;
      ctx.lineWidth = 2 * scale;
      
      // 左上角
      ctx.beginPath();
      ctx.moveTo(20 * scale, 30 * scale);
      ctx.lineTo(20 * scale, 20 * scale);
      ctx.lineTo(30 * scale, 20 * scale);
      ctx.stroke();
      
      // 右上角
      ctx.beginPath();
      ctx.moveTo(width - 20 * scale, 30 * scale);
      ctx.lineTo(width - 20 * scale, 20 * scale);
      ctx.lineTo(width - 30 * scale, 20 * scale);
      ctx.stroke();
      
      // 左下角
      ctx.beginPath();
      ctx.moveTo(20 * scale, height - 30 * scale);
      ctx.lineTo(20 * scale, height - 20 * scale);
      ctx.lineTo(30 * scale, height - 20 * scale);
      ctx.stroke();
      
      // 右下角
      ctx.beginPath();
      ctx.moveTo(width - 20 * scale, height - 30 * scale);
      ctx.lineTo(width - 20 * scale, height - 20 * scale);
      ctx.lineTo(width - 30 * scale, height - 20 * scale);
      ctx.stroke();
      break;
    case 'colorful':
      // 多彩模板添加圆点装饰
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      
      // 左上角圆点
      ctx.beginPath();
      ctx.arc(20 * scale, 20 * scale, 5 * scale, 0, Math.PI * 2);
      ctx.fill();
      
      // 右上角圆点
      ctx.beginPath();
      ctx.arc(width - 20 * scale, 20 * scale, 5 * scale, 0, Math.PI * 2);
      ctx.fill();
      
      // 左下角圆点
      ctx.beginPath();
      ctx.arc(20 * scale, height - 20 * scale, 5 * scale, 0, Math.PI * 2);
      ctx.fill();
      
      // 右下角圆点
      ctx.beginPath();
      ctx.arc(width - 20 * scale, height - 20 * scale, 5 * scale, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'dark':
      // 暗黑模板添加边框
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1 * scale;
      ctx.strokeRect(10 * scale, 10 * scale, width - 20 * scale, height - 20 * scale);
      break;
  }
}

/**
 * 获取文本换行后的行数组
 * @param {CanvasRenderingContext2D} ctx - Canvas上下文
 * @param {string} text - 文本内容
 * @param {number} maxWidth - 最大宽度
 * @returns {string[]} 文本行数组
 */
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