/**双向数据绑定的理解https://github.com/febobo/web-interview/issues/2 */
class Vue{
    // 构造函数：执行初始化，
    constructor(options){
        this.$options = options;
        this.$data = options.data;
        // 对data执行响应化处理
        observe(this.$data);
        // 代理data到vm上
        proxy(this);
        // 编译
        new Compile(options.el,this);
    }
}

//对data选项执行响应化具体操作
function observe(obj){
    if(typeof obi !=='object' || obj === null){
        return ;
    }
    new Observe(obj);
}
class Observe{
    constructor(value){
        this.value = value;
        this.walk(value);
    }
    walk(obj){
        Object.keys(obj).forEach((key)=>{
            defineReactive(obj,key,obj[key]);
        });
    }
}

// 编译 Compile
/** 对每个元素节点的指令进行扫描跟解析，根据指令模板替换数据，以及绑定相应的更新函数 */
class Compile{
    constructor(el,vm){
        this.$vm = vm;
        this.$el = document.querySelector(el); //获取dom
        if(this.$el){
            this.compile(this.$el);
        }
    }
    compile(el){
        const childNodes = el.childNodes;
        Array.from(childNodes).forEach((node)=>{
            // 遍历子元素
            if(this.isElement(node)){
                // 判断是否为节点
                console.log('编译元素'+node.nodeName);
            }else if (this.isInterpolation(node)){
                // 判断是否为插值文本
                console.log('编译插值文本'+ node.textContent);
            }
            if(node.childNodes && node.childNodes.length>0){
                // 判断是否有子元素
                this.compile(node);// 对子元素进行递归遍历
            }
        });
    }
    isElement(node){
        return node.nodeType ===1;
    }
    //是否为插值文本
    isInterpolation(node){
        return node.nodeType ==3 && /\{\{(.*)\}}/.test(node.textContent)
    }
}