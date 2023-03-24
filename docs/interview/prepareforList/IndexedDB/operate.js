/**
 * 打开数据库
 * @param {object} dbName 数据库名字
 * @param {string} storeName 仓库名称
 * @param {string} version 数据库版本
 * @param {object} 该函数会返回一个数据库实例
 */
function openDB(dbName, version = 1) {
  return new Promise((resolve, reject) => {
    //兼容浏览器
    let indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;
    window.IDBTransaction =
      window.IDBTransaction ||
      window.webkitIDBTransaction ||
      window.msIDBTransaction;
    window.IDBKeyRange =
      window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    var db; // 存储数据库实例
    /** 打开数据库，没有则会创建 */
    const request = indexedDB.open(dbName, version);
    //request 是一个IDBDatabase对象的实例
    request.onsuccess = (event) => {
      db = event.target.result;
      console.log("数据库打开/创建成功");
      resolve(db);
    };
    request.onerror = (event) => {
      //   reject(event);
      alert("Database error: " + event.target.errorCode);
    };
    request.onupgradeneeded = (event) => {
      // 数据库创建或者升级的时候会触发这个函数
      console.log("触发onupgradeneeded");
      db = event.target.result;
      let objectStore;
      // 创建数据库，或者说“表”
      objectStore = db.createObjectStore("users", {
        keyPath: "userid", //这是主键
        //autoIncrement:true//实现自增
      });
      // 创建索引，在后面查询数据的时候可以根据索引查
      objectStore.createIndex("userid", "userid", { unique: true });
      objectStore.createIndex("name", "name", { unique: false });
      objectStore.createIndex("age", "age", { unique: false });
    };
  });
}
/**
 *  新增数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} data 数据
 */
function addData(db,storeName,data){
    var request = db
    .transaction([storeName],'readwrite')
    .objectStore(storeName)
    .add(data);

    request.onsuccess = (event)=>{
        console.log('数据写入成功');
    }
    request.onerror = (event)=>{
        console.log('数据写入失败');
    }
}
/** 读取数据 */

function getData(db,storeName,data){
    var request = db
    .transaction([storeName],'readwrite')
    .objectStore(storeName)
    .get(data);

    request.onsuccess = (event)=>{
        console.log('数据读取成功',event);
    }
    request.onerror = (event)=>{
        console.log('数据读取失败',event);
    }
}

/**
 * 通过指针查很多数据
 */
function getDataByCursor(db,storeName){
    let result = [];
    var request = db
    .transaction([storeName],'readwrite')
    .objectStore(storeName)
    .openCursor();
    request.onsuccess = (e)=>{
        var cursor = e.target.result;
        if(cursor){
            result.push(cursor.value);
            cursor.continue();
        }else{
            console.log('游标读取到的所有数据',result);
        }
    }

}

/** 通过索引+游标 分页查询 */
function cursorGetDataByIndexAndPage(db,storeName,indexName,indexValue,page,pageSize){
    let result = [];
    let count = 0;//计数器
    let advanced = true;//是否跳过多少条查询
    var request = db.transaction(storeName,'readwrite')
    .objectStore(storeName)
    .index(indexName)
    .openCursor(IDBKeyRange.only(indexValue));
    request.onsuccess = (e)=>{
        var cursor  = e.target.result;
        if(page>1 &&advanced){
            advanced = false;
            cursor.advance((page-1)*pageSize);//跳过多少条
            return ;
        }
        if(cursor){
            result.push(cursor.value);
            count++;
            if(count<pageSize){
                cursor.continue();//遍历了存储对象中的所有内容
            }else{
                cursor = bull;
            console.log('分页查询结果',result);

            }
        }else{
            console.log('分页查询结果',result);
        }
    }
    
}