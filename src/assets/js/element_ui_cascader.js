/**
 * @author zty
 * @function 与element级联选择器相关的工具方法
 */
const cascadeUtil = {
    /**
     * @variation 辅助对象，节点id指向节点本身，模拟指针的效果，可用于查找父节点。
     */
    _linkMap: {},
  
    _isEmptyLinkMap: function() {
      return (!Object.values(this._linkMap).length || !Object.keys(this._linkMap).length)
    },
  
    /**
     * @function 将Array存储的对象构建成element级联选择器可用的"Tree" 原有的节点上添加了_id _pid children三个属性
     * @param array 服务端返回的Array<Object>()
     * @param id 节点的主键 - id值 String
     * @param parentId 节点的父节点 主键 - id值  String
     * @param rootId 跟节点的主键id
     * @returns {Array[]}
     */
    makeTree: function(array, id = "id", parentId = "parentId", rootId = 0) {
      let tree = [];
      let lkMap = {};
      let list = [...array]
      for (let node of list) {
        node._id = node[id] + "";
        node._pid = node[parentId] + "";
        lkMap[node._id] = node;
      }
      this._linkMap = lkMap
      // console.log("map = ", lkMap)
      for (let ele of list) {
        if (ele._pid === String(rootId)) {
          tree.push(ele);
        } else {
          let parentNode = lkMap[ele._pid];
          if (parentNode) {
            parentNode.children = parentNode.children ? parentNode.children : [];
            parentNode.children.push(ele);
          }
        }
      }
      // console.log("tree = ", tree)
      return tree
    },
  
    /**
     * @function 根据节点 映射 根节点到节点的路径 用户表格展示
     * @param list 需要遍历的Array
     * @param id 节点的主键 - id值
     * @param property 如果填了property 则映射出路径上每个节点的property
     * @returns {Map}
     */
    buildCascadePropertyMap (list, property) {
      let map = {}
      for (let ele of list) {
        let _id = ele["_id"]
        map[_id] = this.listTreePath(_id, property)
      }
      // console.log("buildCascadePropertyMap = ", map)
      return map
    },
  
    /**
     * @function 从下往上 递归查找节点到根节点的路径
     * @param id 查找节点的id值 - 主键
     * @param path 路径 递归使用
     * @returns {Array}
     */
    _findPath: function (id, path = []) {
      let node = this._linkMap[id] ? this._linkMap[id] : ""
      if (node) {
        path.unshift(node)
        return this._findPath(node._pid, path)
      }
      return path
    },
  
    /**
     * @function 从下往上 递归查找节点到根节点的路径 如果填了property 则映射出路径上每个节点的property 用于编辑回显使用
     * @param id 查找节点的id值 - 主键
     * @param property 节点的property
     * @returns {*}
     */
    listTreePath: function (id, property) {
      if (this._isEmptyLinkMap()) {
        throw new Error("Please use function makeTree first")
      }
      let path = this._findPath(id + "")
      if (property && path.length > 0) {
        return path.map(x => x[property])
      }
      return path
    }
  
  }
  export default cascadeUtil;
  