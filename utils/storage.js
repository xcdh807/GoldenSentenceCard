/**
 * 网页金句卡片生成器 - 存储工具函数
 * 处理设置的保存和加载
 */

/**
 * 保存设置到本地存储
 * @param {Object} settings - 要保存的设置
 * @returns {Promise} 保存操作的Promise
 */
export function saveSettings(settings) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.set({ settings }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(true);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 从本地存储加载设置
 * @returns {Promise<Object>} 包含设置的Promise
 */
export function loadSettings() {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(['settings', 'defaultSettings'], (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve({
            settings: result.settings,
            defaultSettings: result.defaultSettings
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 保存默认设置到本地存储
 * @param {Object} defaultSettings - 要保存的默认设置
 * @returns {Promise} 保存操作的Promise
 */
export function saveDefaultSettings(defaultSettings) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.set({ defaultSettings }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(true);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 获取默认设置
 * @returns {Object} 默认设置对象
 */
export function getDefaultSettingsObject() {
  return {
    template: 'simple',
    bgColor: '#ffffff',
    gradient: 'none',
    fontFamily: 'Microsoft YaHei, sans-serif',
    fontSize: '18',
    fontColor: '#000000',
    showSource: false,
    sourceText: '',
    exportFormat: 'png',
    exportResolution: 'standard'
  };
}

/**
 * 重置所有设置为默认值
 * @returns {Promise} 重置操作的Promise
 */
export function resetAllSettings() {
  const defaultSettings = getDefaultSettingsObject();
  
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.set({ 
        settings: defaultSettings,
        defaultSettings: defaultSettings 
      }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(true);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}