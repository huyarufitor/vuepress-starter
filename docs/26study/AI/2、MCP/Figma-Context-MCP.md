## figma 写前端样式

允许 AI 工具（如 Cursor）直接读取 Figma 设计数据（结构、样式、图层），实现从设计到代码的自动化转换

### 适用范围

可以写活动页、强 UI 的 h5 页面，准确性测试后没有特别高，把布局什么的弄好了，但是逻辑还是需要自己去写；

```javascript
{
  "mcpServers": {
    "Figma AI Bridge": {
      "command": "npx",
      "args": [
        "-y",
        "figma-developer-mcp",
        "--stdio"
      ],
      "env": {
        "FIGMA_API_KEY": "figd_tgOfhV1POVHrQpS25JziQPaiT_l5gkm4Wp-4zUpL"
      }
    }
  }
}
```
