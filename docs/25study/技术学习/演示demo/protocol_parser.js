// CRC16 查找表 (XMODEM)
const crc16tab = [
  0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5, 0x60c6, 0x70e7, 0x8108,
  0x9129, 0xa14a, 0xb16b, 0xc18c, 0xd1ad, 0xe1ce, 0xf1ef, 0x1231, 0x0210,
  0x3273, 0x2252, 0x52b5, 0x4294, 0x72f7, 0x62d6, 0x9339, 0x8318, 0xb37b,
  0xa35a, 0xd3bd, 0xc39c, 0xf3ff, 0xe3de, 0x2462, 0x3443, 0x0420, 0x1401,
  0x64e6, 0x74c7, 0x44a4, 0x5485, 0xa56a, 0xb54b, 0x8528, 0x9509, 0xe5ee,
  0xf5cf, 0xc5ac, 0xd58d, 0x3653, 0x2672, 0x1611, 0x0630, 0x76d7, 0x66f6,
  0x5695, 0x46b4, 0xb75b, 0xa77a, 0x9719, 0x8738, 0xf7df, 0xe7fe, 0xd79d,
  0xc7bc, 0x48c4, 0x58e5, 0x6886, 0x78a7, 0x0840, 0x1861, 0x2802, 0x3823,
  0xc9cc, 0xd9ed, 0xe98e, 0xf9af, 0x8948, 0x9969, 0xa90a, 0xb92b, 0x5af5,
  0x4ad4, 0x7ab7, 0x6a96, 0x1a71, 0x0a50, 0x3a33, 0x2a12, 0xdbfd, 0xcbdc,
  0xfbbf, 0xeb9e, 0x9b79, 0x8b58, 0xbb3b, 0xab1a, 0x6ca6, 0x7c87, 0x4ce4,
  0x5cc5, 0x2c22, 0x3c03, 0x0c60, 0x1c41, 0xedae, 0xfd8f, 0xcdec, 0xddcd,
  0xad2a, 0xbd0b, 0x8d68, 0x9d49, 0x7e97, 0x6eb6, 0x5ed5, 0x4ef4, 0x3e13,
  0x2e32, 0x1e51, 0x0e70, 0xff9f, 0xefbe, 0xdfdd, 0xcffc, 0xbf1b, 0xaf3a,
  0x9f59, 0x8f78, 0x9188, 0x81a9, 0xb1ca, 0xa1eb, 0xd10c, 0xc12d, 0xf14e,
  0xe16f, 0x1080, 0x00a1, 0x30c2, 0x20e3, 0x5004, 0x4025, 0x7046, 0x6067,
  0x83b9, 0x9398, 0xa3fb, 0xb3da, 0xc33d, 0xd31c, 0xe37f, 0xf35e, 0x02b1,
  0x1290, 0x22f3, 0x32d2, 0x4235, 0x5214, 0x6277, 0x7256, 0xb5ea, 0xa5cb,
  0x95a8, 0x8589, 0xf56e, 0xe54f, 0xd52c, 0xc50d, 0x34e2, 0x24c3, 0x14a0,
  0x0481, 0x7466, 0x6447, 0x5424, 0x4405, 0xa7db, 0xb7fa, 0x8799, 0x97b8,
  0xe75f, 0xf77e, 0xc71d, 0xd73c, 0x26d3, 0x36f2, 0x0691, 0x16b0, 0x6657,
  0x7676, 0x4615, 0x5634, 0xd94c, 0xc96d, 0xf90e, 0xe92f, 0x99c8, 0x89e9,
  0xb98a, 0xa9ab, 0x5844, 0x4865, 0x7806, 0x6827, 0x18c0, 0x08e1, 0x3882,
  0x28a3, 0xcb7d, 0xdb5c, 0xeb3f, 0xfb1e, 0x8bf9, 0x9bd8, 0xabbb, 0xbb9a,
  0x4a75, 0x5a54, 0x6a37, 0x7a16, 0x0af1, 0x1ad0, 0x2ab3, 0x3a92, 0xfd2e,
  0xed0f, 0xdd6c, 0xcd4d, 0xbdaa, 0xad8b, 0x9de8, 0x8dc9, 0x7c26, 0x6c07,
  0x5c64, 0x4c45, 0x3ca2, 0x2c83, 0x1ce0, 0x0cc1, 0xef1f, 0xff3e, 0xcf5d,
  0xdf7c, 0xaf9b, 0xbfba, 0x8fd9, 0x9ff8, 0x6e17, 0x7e36, 0x4e55, 0x5e74,
  0x2e93, 0x3eb2, 0x0ed1, 0x1ef0,
];

/**
 * 计算CRC16校验值 (XMODEM算法)
 * @param {Uint8Array} buf - 数据缓冲区
 * @param {number} len - 数据长度
 * @returns {number} CRC16值
 */
function crc16(buf, len) {
  let crc = 0;
  for (let counter = 0; counter < len; counter++) {
    crc =
      ((crc << 8) & 0xffff) ^ crc16tab[((crc >> 8) ^ buf[counter]) & 0x00ff];
  }
  return crc & 0xffff;
}

/**
 * 将16进制字符串转换为Uint8Array
 * @param {string} hexString - 16进制字符串 (如 "AA BB 36 ...")
 * @returns {Uint8Array} 字节数组
 */
function hexStringToBytes(hexString) {
  // 移除空格并转为大写
  const hex = hexString.replace(/\s+/g, "").toUpperCase();

  // 检查是否为有效的16进制字符串
  if (!/^[0-9A-F]*$/.test(hex)) {
    throw new Error("无效的16进制字符串");
  }

  if (hex.length % 2 !== 0) {
    throw new Error("16进制字符串长度必须为偶数");
  }

  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }

  return bytes;
}

/**
 * 将字节数组转换为16进制字符串
 * @param {Uint8Array} bytes - 字节数组
 * @returns {string} 16进制字符串
 */
function bytesToHexString(bytes) {
  return Array.from(bytes)
    .map((b) => b.toString(16).toUpperCase().padStart(2, "0"))
    .join(" ");
}

/**
 * 从字节数组中读取32位浮点数 (小端序)
 * @param {Uint8Array} bytes - 字节数组
 * @param {number} offset - 起始偏移量
 * @returns {number} 浮点数值
 */
function readFloat32LE(bytes, offset) {
  const buffer = new ArrayBuffer(4);
  const view = new DataView(buffer);

  // 小端序写入4个字节
  for (let i = 0; i < 4; i++) {
    view.setUint8(i, bytes[offset + i]);
  }

  return view.getFloat32(0, true); // true表示小端序
}

/**
 * 将kboard数据转换为fingerstyle格式 / Convert kboard data to fingerstyle format
 * @param {object} kboard - kboard结构体数据 / kboard struct data
 * @returns {array} fingerstyle格式数组 / fingerstyle format array
 */
function toFingerstyleFormat(kboard) {
  const fingerstyle = [];
  let index = 1;

  // 映射规则：
  // key_1[12] → 上面和弦 → index 1~12
  for (let i = 0; i < kboard.key_1.length; i++) {
    fingerstyle.push({
      index: index++,
      dynamics: kboard.key_1[i],
    });
  }

  // note[12] → 中间和弦 → index 13~24
  for (let i = 0; i < kboard.note.length; i++) {
    fingerstyle.push({
      index: index++,
      dynamics: kboard.note[i],
    });
  }

  // key_0[12] → 下面和弦 → index 25~36
  for (let i = 0; i < kboard.key_0.length; i++) {
    fingerstyle.push({
      index: index++,
      dynamics: kboard.key_0[i],
    });
  }

  // arpeggio[6] → 琶音 → index 37~42
  for (let i = 0; i < kboard.arpeggio.length; i++) {
    fingerstyle.push({
      index: index++,
      dynamics: kboard.arpeggio[i],
    });
  }

  // drum[1] → 节奏 → index 43
  fingerstyle.push({
    index: index++,
    dynamics: kboard.drum,
  });

  return fingerstyle;
}

/**
 * 将kboard数据转换为picks格式 / Convert kboard data to picks format
 * @param {object} kboard - kboard结构体数据 / kboard struct data
 * @returns {array} picks格式数组 / picks format array
 */
function toPicksFormat(kboard) {
  const picks = [];

  // 处理pick_a / Process pick_a
  const directionA = kboard.direction_a === 0 ? kboard.pick_a : -kboard.pick_a;
  picks.push({
    pickType: "A",
    direction: directionA,
  });

  // 处理pick_b / Process pick_b
  const directionB = kboard.direction_b === 0 ? kboard.pick_b : -kboard.pick_b;
  picks.push({
    pickType: "B",
    direction: directionB,
  });

  return picks;
}

/**
 * 将字节数组转换为JSON格式 / Convert byte array to JSON format
 * 直接调用parseProtocolFromBytes进行协议解析 / Directly call parseProtocolFromBytes for protocol parsing
 * @param {Uint8Array} bytes - 字节数组 / Byte array
 * @returns {object} JSON格式的解析结果 / JSON formatted parse result
 */
function bytesToJson(bytes) {
  // 直接使用parseProtocolFromBytes解析字节数组 / Directly use parseProtocolFromBytes to parse byte array
  return parseProtocolFromBytes(bytes);
}

/**
 * 直接解析字节数组协议 / Parse protocol from byte array directly
 * @param {Uint8Array} data - 字节数组 / Byte array
 * @returns {object} 解析结果 / Parse result
 */
function parseProtocolFromBytes(data) {
  try {
    // 最小长度检查: 头(2) + 长度(1) + CRC(2) = 5字节 / Minimum length check
    if (data.length < 5) {
      throw new Error(
        "数据长度不足，至少需要5字节 / Insufficient data length, minimum 5 bytes required"
      );
    }

    // 检查协议头 / Check protocol header
    if (data[0] !== 0xaa || data[1] !== 0xbb) {
      throw new Error(
        `协议头错误: 期望 AA BB, 实际 ${data[0]
          .toString(16)
          .toUpperCase()
          .padStart(2, "0")} ${data[1]
          .toString(16)
          .toUpperCase()
          .padStart(2, "0")} / Protocol header error`
      );
    }

    // 获取长度字段 / Get length field
    const lengthField = data[2];

    // 数据长度 = 总长度 - 头(2) - 长度字段(1) - CRC(2) / Data length calculation
    const expectedDataLength = data.length - 5;

    // 验证长度字段 / Validate length field
    if (lengthField !== expectedDataLength) {
      console.warn(
        `长度字段不匹配: 长度字段=${lengthField}, 实际数据长度=${expectedDataLength} / Length field mismatch`
      );
    }

    // 提取CRC / Extract CRC
    const receivedCRC = (data[data.length - 2] << 8) | data[data.length - 1];

    // 计算CRC (从协议头开始到CRC之前的所有数据) / Calculate CRC
    const crcData = data.slice(0, data.length - 2);
    const calculatedCRC = crc16(crcData, crcData.length);

    // 验证CRC / Validate CRC
    const crcValid = receivedCRC === calculatedCRC;

    // 提取数据部分 (长度字段之后到CRC之前) / Extract data section
    const dataSection = data.slice(3, data.length - 2);

    // 解析 kboard_t 结构 / Parse kboard_t structure
    let kboard = null;
    let fingerstyle = [];
    let picks = [];

    // 添加调试信息 / Add debug information
    // console.log(
    //   `数据部分长度: ${dataSection.length} 字节 / Data section length: ${dataSection.length} bytes`
    // );
    // console.log(
    //   `数据部分内容: ${bytesToHexString(dataSection)} / Data section content`
    // );

    // 期望的数据长度: 12+12+12+6+1+1+1+4+4 = 53字节 / Expected data length
    // 必须有完整的53字节才能正确解析 / Must have complete 53 bytes for correct parsing
    if (dataSection.length < 53) {
      throw new Error(
        `数据长度不足，无法解析完整的kboard结构。需要53字节，实际${dataSection.length}字节 / Insufficient data length for complete kboard structure. Need 53 bytes, got ${dataSection.length} bytes`
      );
    }

    kboard = {
      key_0: Array.from(dataSection.slice(0, 12)),
      note: Array.from(dataSection.slice(12, 24)),
      key_1: Array.from(dataSection.slice(24, 36)),
      arpeggio: Array.from(dataSection.slice(36, 42)),
      drum: dataSection[42],
      direction_a: dataSection[43], // 0=正数, 1=负数 / 0=positive, 1=negative
      direction_b: dataSection[44], // 0=正数, 1=负数 / 0=positive, 1=negative
      pick_a: readFloat32LE(dataSection, 45),
      pick_b: readFloat32LE(dataSection, 49),
    };

    // 转换为指定格式 / Convert to specified format
    fingerstyle = toFingerstyleFormat(kboard);
    picks = toPicksFormat(kboard);

    //   console.log(`成功解析kboard结构 / Successfully parsed kboard structure`);
    //   console.log(
    //     `Fingerstyle数据长度: ${fingerstyle.length} / Fingerstyle data length`
    //   );
    //   console.log(`Picks数据长度: ${picks.length} / Picks data length`);

    return {
      success: true,
      data: {
        fingerstyle: fingerstyle,
        picks: picks,
      },
      // timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * 解析通讯协议 (兼容字符串输入) / Parse communication protocol (compatible with string input)
 * @param {string} hexString - 16进制字符串 / Hex string
 * @returns {object} 解析结果 / Parse result
 */
function parseProtocol(hexString) {
  try {
    // 转换为字节数组 / Convert to byte array
    const data = hexStringToBytes(hexString);
    return parseProtocolFromBytes(data);
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * 协议解析器类 / Protocol Parser Class
 * 提供完整的协议解析功能，包括粘包处理 / Provides complete protocol parsing functionality including packet handling
 */
class ProtocolParser {
  constructor() {
    this.buffer = new Uint8Array(0); // 数据缓冲区 / Data buffer
    this.onDataCallback = null; // 数据回调函数 / Data callback function
    this.onErrorCallback = null; // 错误回调函数 / Error callback function
  }

  /**
   * 设置数据接收回调 / Set data receive callback
   * @param {function} callback - 回调函数，参数为解析结果 / Callback function with parse result parameter
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
   * 处理接收到的数据 (处理粘包) / Process received data (handle packet sticking)
   * @param {Uint8Array} newData - 新接收的数据 / Newly received data
   */
  processData(newData) {
    // 将新数据追加到缓冲区 / Append new data to buffer
    const combinedData = new Uint8Array(this.buffer.length + newData.length);
    combinedData.set(this.buffer);
    combinedData.set(newData, this.buffer.length);
    this.buffer = combinedData;

    // 尝试解析完整的数据包 / Try to parse complete packets
    this._parsePackets();
  }

  /**
   * 从缓冲区解析数据包 (改进的数据移位处理) / Parse packets from buffer (improved data shift handling)
   * @private
   */
  _parsePackets() {
    while (this.buffer.length >= 5) {
      // 最小包长度 / Minimum packet length
      let packetFound = false;
      let searchStartIndex = 0;

      // 循环查找有效的协议头，处理数据移位 / Loop to find valid protocol header, handle data shift
      while (searchStartIndex <= this.buffer.length - 5) {
        // 查找协议头 AA BB / Find protocol header AA BB
        let headerIndex = -1;
        for (let i = searchStartIndex; i <= this.buffer.length - 2; i++) {
          if (this.buffer[i] === 0xaa && this.buffer[i + 1] === 0xbb) {
            headerIndex = i;
            break;
          }
        }

        if (headerIndex === -1) {
          // 没有找到协议头，保留最后4个字节防止协议头被截断 / No protocol header found, keep last 4 bytes to prevent header truncation
          if (this.buffer.length > 4) {
            this.buffer = this.buffer.slice(-4);
          }
          return;
        }

        // 移除协议头之前的无效数据 / Remove invalid data before protocol header
        if (headerIndex > 0) {
          this.buffer = this.buffer.slice(headerIndex);
          //   console.log(
          //     `数据移位检测: 丢弃了 ${headerIndex} 个字节的无效数据 / Data shift detected: discarded ${headerIndex} bytes of invalid data`
          //   );
        }

        // 检查是否有足够的数据读取长度字段 / Check if enough data to read length field
        if (this.buffer.length < 3) {
          return;
        }

        const lengthField = this.buffer[2];

        // 验证长度字段的合理性 / Validate length field reasonableness
        if (lengthField < 1 || lengthField > 255) {
          //   console.log(
          //     `无效的长度字段: ${lengthField}，继续搜索下一个协议头 / Invalid length field: ${lengthField}, continue searching next header`
          //   );
          searchStartIndex = 1; // 从下一个字节开始搜索 / Start searching from next byte
          this.buffer = this.buffer.slice(1);
          continue;
        }

        const totalPacketLength = lengthField + 5; // 数据长度 + 头(2) + 长度(1) + CRC(2)

        // 检查包长度是否合理 / Check if packet length is reasonable
        if (totalPacketLength > 300) {
          // 假设最大包长度为300字节 / Assume max packet length is 300 bytes
          //   console.log(
          //     `包长度过大: ${totalPacketLength}，继续搜索下一个协议头 / Packet too large: ${totalPacketLength}, continue searching next header`
          //   );
          searchStartIndex = 1;
          this.buffer = this.buffer.slice(1);
          continue;
        }

        // 检查是否有完整的数据包 / Check if complete packet available
        if (this.buffer.length < totalPacketLength) {
          return; // 等待更多数据 / Wait for more data
        }

        // 提取完整的数据包 / Extract complete packet
        const packet = this.buffer.slice(0, totalPacketLength);

        // 解析数据包并验证CRC / Parse packet and validate CRC
        try {
          const result = parseProtocolFromBytes(packet); // 直接使用字节数组解析 / Parse directly from byte array

          // 如果解析成功，说明找到了有效的数据包 / If parsing successful, valid packet found
          this.buffer = this.buffer.slice(totalPacketLength);
          packetFound = true;

          if (this.onDataCallback) {
            this.onDataCallback(result);
          }
          break; // 跳出内层循环，继续处理下一个包 / Break inner loop, continue processing next packet
        } catch (error) {
          // CRC校验失败或其他解析错误，继续搜索下一个协议头 / CRC validation failed or other parse error, continue searching next header
          //   console.log(
          //     `数据包解析失败: ${error.message}，继续搜索下一个协议头 / Packet parsing failed: ${error.message}, continue searching next header`
          //   );
          searchStartIndex = 1;
          this.buffer = this.buffer.slice(1);

          if (this.onErrorCallback) {
            this.onErrorCallback({
              type: "parse_error_with_resync",
              message: `解析错误，尝试重新同步: ${error.message}`,
              error: error,
            });
          }
          continue;
        }
      }

      // 如果没有找到有效包，退出外层循环 / If no valid packet found, exit outer loop
      if (!packetFound) {
        break;
      }
    }
  }

  /**
   * 清空缓冲区 / Clear buffer
   */
  clearBuffer() {
    this.buffer = new Uint8Array(0);
  }

  /**
   * 获取缓冲区状态 (增强版) / Get buffer status (enhanced version)
   * @returns {object} 缓冲区信息 / Buffer information
   */
  getBufferStatus() {
    return {
      bufferLength: this.buffer.length,
      bufferHex: this.buffer.length > 0 ? bytesToHexString(this.buffer) : "",
      hasValidHeader: this._hasValidHeader(),
      nextHeaderPosition: this._findNextHeaderPosition(),
    };
  }

  /**
   * 检查缓冲区是否包含有效的协议头 / Check if buffer contains valid protocol header
   * @private
   * @returns {boolean} 是否包含有效协议头 / Whether contains valid protocol header
   */
  _hasValidHeader() {
    for (let i = 0; i <= this.buffer.length - 2; i++) {
      if (this.buffer[i] === 0xaa && this.buffer[i + 1] === 0xbb) {
        return true;
      }
    }
    return false;
  }

  /**
   * 查找下一个协议头的位置 / Find next protocol header position
   * @private
   * @returns {number} 协议头位置，-1表示未找到 / Header position, -1 if not found
   */
  _findNextHeaderPosition() {
    for (let i = 0; i <= this.buffer.length - 2; i++) {
      if (this.buffer[i] === 0xaa && this.buffer[i + 1] === 0xbb) {
        return i;
      }
    }
    return -1;
  }
}

// 导出函数和类供网页使用 / Export functions and classes for web use
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ProtocolParser,
    parseProtocol,
    parseProtocolFromBytes,
    bytesToJson,
    crc16,
    hexStringToBytes,
    bytesToHexString,
    readFloat32LE,
    toFingerstyleFormat,
    toPicksFormat,
  };
}

// 全局导出 (用于浏览器环境) / Global export for browser environment
if (typeof window !== "undefined") {
  window.ProtocolParser = ProtocolParser;
  window.parseProtocol = parseProtocol;
  window.parseProtocolFromBytes = parseProtocolFromBytes;
  window.bytesToJson = bytesToJson;
  window.hexStringToBytes = hexStringToBytes;
  window.bytesToHexString = bytesToHexString;
}
