function changeObjProperty(o) {
    o.siteUrl = "http://www.baidu.com"
    console.log('1',o);
    o = new Object()
    console.log('2',o);
    o.siteUrl = "http://www.google.com"
    console.log('3',o);
  } 
  let webSite = new Object();
  console.log('webSite',webSite);
  changeObjProperty(webSite);
  console.log(webSite.siteUrl);