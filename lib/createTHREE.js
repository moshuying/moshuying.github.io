/**
 * 向指定div内创建iframe标签,同时为hexo做了简单适配
 * @param {string} divId
 */
function createIframe(divNode) {
  return new Promise((resolve) => {
    let iframe = document.createElement("iframe");
    iframe.scrolling = "no";
    iframe.border = 0;
    iframe.frameborder = "no";
    iframe.framespacing = 0;
    iframe.allowfullscreen = true;
    iframe.style =
      "position: absolute; width: 100%; height: 100%; left: 0; top: 0;border:none;";
    iframe.onload = () => resolve(iframe.contentWindow);
    divNode.style = "position: relative; width: 100%; height: 0; padding-bottom: 75%;";
    divNode.appendChild(iframe);
  });
}

/**
 * 
 * @param {string} str 
 * @param {string} type 
 * @return {string} blob url
 */
function createBlob(str,type){
  let blob = new Blob([str],{type})
  return URL.createObjectURL(blob)
}

/**
 * 用于创建iframe框的默认样式，清除掉影响美观的属性
 * @return {string} 返回一个blob
 */
function createCss(){
  return createBlob(`
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  
  canvas:focus {
    outline: none;
  }
  `,'text/css')
}

/**
 * 在ifram内加载cdn链接指向的three，返回window对象中包含了THREE
 * @param {string} divId
 * @param {string} threeJsUrl threejs 的加载链接
 * @return {Promise}
 */
function cdnLoadTHREE(divNode,threeJsUrl) {
  return createIframe(divNode).then((iframe_window) => {
    // 创建完iframe才有了iframe内的iframe_window对象
    let link = document.createElement('link')
    link.href = createCss()
    link.rel = 'stylesheet'
    link.type = 'text/css'
    iframe_window.document.head.appendChild(link);
    return new Promise((resolve, reject) => {
      try {
        let three = document.createElement("script");
        three.src = threeJsUrl || "https://cdn.bootcdn.net/ajax/libs/three.js/r120/three.min.js";
        iframe_window.document.head.appendChild(three);
        three.onload = () => resolve(iframe_window);
      } catch (error) {
        reject(error);
      }
    });
  });
}

/**
 * 使用Promise.all校验所有script是否加载完毕
 * @param {object} iframe_window
 * @param {string[] | string} PlugArr 
 * @param {string} prefixUrl
 * @return {Promise.all}
 */
function loadPlug(PlugArr){
  if(!PlugArr) return '';
  if(!PlugArr.length) PlugArr = [PlugArr];
  let promise = []
  PlugArr.forEach((src)=>{
    promise.push(new Promise((resolve,reject)=>{
      let script = document.createElement('script');
      document.head.appendChild(script);
      src = window.prefixUrl+src;
      script.src=src;
      script.onload = ()=>{
        resolve()
      }
    }))
  })
  return Promise.all(promise)
}
/**
 * 
 * @param {string} divId 用于放置three iframe的div
 * @param {string} scriptId 代码入口
 * @param {string} prefixUrl 选填，three.js插件的链接 不支持js module 默认使用 https://threejs.org/examples/js/
 * @param {string} threeJsUrl 选填，three.js本身的链接 默认使用 https://cdn.bootcdn.net/ajax/libs/three.js/r120/three.min.js
 * @examples initHexoThree('three','threeMain')
 */
function initHexoThree(divNode,scriptNode,prefixUrl,threeJsUrl){
  if(divNode){
    cdnLoadTHREE(divNode,threeJsUrl).then((iframe_window)=>{
      iframe_window.prefixUrl = prefixUrl || 'https://threejs.org/examples/js/'
      let script = document.createElement('script')
      script.src = createBlob(loadPlug.toString()+';\n'+scriptNode.text,'application/javascript')
      iframe_window.document.head.appendChild(script)
    })
  }
}