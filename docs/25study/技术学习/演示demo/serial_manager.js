/**
 * 串口管理器类 / Serial Port Manager Class
 * 提供Web Serial API的封装，处理串口连接和数据通信 / Provides Web Serial API wrapper for serial connection and data communication
 */
class SerialManager {
    constructor() {
        this.port = null; // 串口对象 / Serial port object
        this.reader = null; // 读取器 / Reader
        this.writer = null; // 写入器 / Writer
        this.isConnected = false; // 连接状态 / Connection status
        this.isReading = false; // 读取状态 / Reading status
        
        // 回调函数 / Callback functions
        this.onDataCallback = null; // 数据接收回调 / Data receive callback
        this.onErrorCallback = null; // 错误回调 / Error callback
        this.onConnectCallback = null; // 连接回调 / Connect callback
        this.onDisconnectCallback = null; // 断开连接回调 / Disconnect callback
        
        // 协议解析器 / Protocol parser
        this.protocolParser = new ProtocolParser();
        this._setupProtocolParser();
    }

    /**
     * 设置协议解析器回调 / Setup protocol parser callbacks
     * @private
     */
    _setupProtocolParser() {
        this.protocolParser.onData((result) => {
            if (this.onDataCallback) {
                this.onDataCallback(result);
            }
        });

        this.protocolParser.onError((error) => {
            if (this.onErrorCallback) {
                this.onErrorCallback(error);
            }
        });
    }

    /**
     * 检查浏览器是否支持Web Serial API / Check if browser supports Web Serial API
     * @returns {boolean} 是否支持 / Whether supported
     */
    isSupported() {
        return 'serial' in navigator;
    }

    /**
     * 设置数据接收回调 / Set data receive callback
     * @param {function} callback - 回调函数 / Callback function
     */
    onData(callback) {
        this.onDataCallback = callback;
    }

    /**
     * 设置错误回调 / Set error callback
     * @param {function} callback - 错误回调函数 / Error callback function
     */
    onError(callback) {
        this.onErrorCallback = callback;
    }

    /**
     * 设置连接回调 / Set connect callback
     * @param {function} callback - 连接回调函数 / Connect callback function
     */
    onConnect(callback) {
        this.onConnectCallback = callback;
    }

    /**
     * 设置断开连接回调 / Set disconnect callback
     * @param {function} callback - 断开连接回调函数 / Disconnect callback function
     */
    onDisconnect(callback) {
        this.onDisconnectCallback = callback;
    }

    /**
     * 连接串口 / Connect to serial port
     * @param {object} options - 串口配置选项 / Serial port configuration options
     * @returns {Promise<boolean>} 连接结果 / Connection result
     */
    async connect(options = {}) {
        try {
            if (!this.isSupported()) {
                throw new Error('浏览器不支持Web Serial API / Browser does not support Web Serial API');
            }

            // 默认配置 / Default configuration
            const defaultOptions = {
                baudRate: 115200,
                dataBits: 8,
                stopBits: 1,
                parity: 'none',
                flowControl: 'none'
            };

            const config = { ...defaultOptions, ...options };

            // 请求串口权限 / Request serial port permission
            this.port = await navigator.serial.requestPort();
            
            // 打开串口 / Open serial port
            await this.port.open(config);
            
            // 获取读写器 / Get reader and writer
            this.reader = this.port.readable.getReader();
            this.writer = this.port.writable.getWriter();
            
            this.isConnected = true;
            
            // 开始读取数据 / Start reading data
            this._startReading();
            
            if (this.onConnectCallback) {
                this.onConnectCallback({
                    success: true,
                    config: config,
                    portInfo: await this._getPortInfo()
                });
            }
            
            return true;
            
        } catch (error) {
            this.isConnected = false;
            
            if (this.onErrorCallback) {
                this.onErrorCallback({
                    type: 'connection_error',
                    message: error.message,
                    error: error
                });
            }
            
            return false;
        }
    }

    /**
     * 断开串口连接 / Disconnect serial port
     */
    async disconnect() {
        try {
            this.isReading = false;
            
            // 释放读写器 / Release reader and writer
            if (this.reader) {
                await this.reader.cancel();
                this.reader.releaseLock();
                this.reader = null;
            }
            
            if (this.writer) {
                this.writer.releaseLock();
                this.writer = null;
            }
            
            // 关闭串口 / Close serial port
            if (this.port) {
                await this.port.close();
                this.port = null;
            }
            
            this.isConnected = false;
            
            // 清空协议解析器缓冲区 / Clear protocol parser buffer
            this.protocolParser.clearBuffer();
            
            if (this.onDisconnectCallback) {
                this.onDisconnectCallback({
                    success: true,
                    message: '串口已断开连接 / Serial port disconnected'
                });
            }
            
        } catch (error) {
            if (this.onErrorCallback) {
                this.onErrorCallback({
                    type: 'disconnection_error',
                    message: error.message,
                    error: error
                });
            }
        }
    }

    /**
     * 发送数据 / Send data
     * @param {string|Uint8Array} data - 要发送的数据 / Data to send
     * @returns {Promise<boolean>} 发送结果 / Send result
     */
    async sendData(data) {
        try {
            if (!this.isConnected || !this.writer) {
                throw new Error('串口未连接 / Serial port not connected');
            }
            
            let dataToSend;
            
            if (typeof data === 'string') {
                // 如果是16进制字符串，转换为字节数组 / If hex string, convert to byte array
                if (/^[0-9A-Fa-f\s]+$/.test(data)) {
                    dataToSend = hexStringToBytes(data);
                } else {
                    // 普通字符串转换为UTF-8字节 / Convert normal string to UTF-8 bytes
                    dataToSend = new TextEncoder().encode(data);
                }
            } else if (data instanceof Uint8Array) {
                dataToSend = data;
            } else {
                throw new Error('不支持的数据类型 / Unsupported data type');
            }
            
            await this.writer.write(dataToSend);
            return true;
            
        } catch (error) {
            if (this.onErrorCallback) {
                this.onErrorCallback({
                    type: 'send_error',
                    message: error.message,
                    error: error
                });
            }
            return false;
        }
    }

    /**
     * 开始读取数据 / Start reading data
     * @private
     */
    async _startReading() {
        this.isReading = true;
        
        try {
            while (this.isReading && this.reader) {
                const { value, done } = await this.reader.read();
                
                if (done) {
                    break;
                }
                
                if (value) {
                    // 将接收到的数据传递给协议解析器 / Pass received data to protocol parser
                    this.protocolParser.processData(value);
                }
            }
        } catch (error) {
            if (this.isReading && this.onErrorCallback) {
                this.onErrorCallback({
                    type: 'read_error',
                    message: error.message,
                    error: error
                });
            }
        }
    }

    /**
     * 获取串口信息 / Get port information
     * @private
     * @returns {object} 串口信息 / Port information
     */
    async _getPortInfo() {
        if (!this.port) {
            return null;
        }
        
        const info = this.port.getInfo();
        return {
            usbVendorId: info.usbVendorId,
            usbProductId: info.usbProductId
        };
    }

    /**
     * 获取连接状态 / Get connection status
     * @returns {object} 状态信息 / Status information
     */
    getStatus() {
        return {
            isConnected: this.isConnected,
            isReading: this.isReading,
            isSupported: this.isSupported(),
            bufferStatus: this.protocolParser.getBufferStatus()
        };
    }

    /**
     * 清空接收缓冲区 / Clear receive buffer
     */
    clearBuffer() {
        this.protocolParser.clearBuffer();
    }
}

// 导出类供网页使用 / Export class for web use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SerialManager;
}

// 全局导出 (用于浏览器环境) / Global export for browser environment
if (typeof window !== 'undefined') {
    window.SerialManager = SerialManager;
}