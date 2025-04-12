/**
 * DeepSeek API 代理服务器
 * 用于处理前端请求并转发到DeepSeek API，解决CORS问题
 */

const http = require('http');
const https = require('https');
const url = require('url');

// 配置信息
const PORT = 3000;
const API_KEY = 'ba747ed2-bd0a-4dc6-93ab-38a8564ab22a';
const API_URL = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';


// 创建HTTP服务器
const server = http.createServer((req, res) => {
  // 设置CORS头，允许扩展访问
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  
  // 只处理POST请求
  if (req.method === 'POST' && req.url === '/summarize') {
    let body = '';
    
    // 接收数据
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    // 处理完整请求
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const text = data.text;
        
        if (!text) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: '缺少文本内容' }));
          return;
        }
        
        // 准备DeepSeek API请求数据
        const requestData = JSON.stringify({
          model: "deepseek-v3-241226",
          messages: [
            { role: "system", content: "使用一个金句总结全文最核心的内容" },
            { role: "user", content: text }
          ],
          temperature: 0.6,
          stream: true
        });
        
        // 设置API请求选项
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
          },
          timeout: 60000 // 60秒超时
        };
        
        // 发送请求到DeepSeek API
        const apiReq = https.request(API_URL, options, (apiRes) => {
          res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
          });
          
          // 转发API响应到客户端
          apiRes.on('data', (chunk) => {
            res.write(chunk);
          });
          
          apiRes.on('end', () => {
            res.end();
          });
        });
        
        // 处理API请求错误
        apiReq.on('error', (error) => {
          console.error('API请求错误:', error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: '调用API时出错' }));
        });
        
        // 发送请求数据
        apiReq.write(requestData);
        apiReq.end();
        
      } catch (error) {
        console.error('处理请求时出错:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: '无效的请求数据' }));
      }
    });
  } else {
    // 处理其他请求
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: '未找到请求的资源' }));
  }
});

// 启动服务器
server.listen(PORT, () => {
  console.log(`DeepSeek API代理服务器运行在 http://localhost:${PORT}`);
});