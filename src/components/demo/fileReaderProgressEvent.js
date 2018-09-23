const ProgressEvent =  {
	isTrusted: true, 
	lengthComputable: true, 
	bubbles: false,
	cancelBubble: false,
	cancelable: false,
	composed: false,
	currentTarget: FileReader = {
		error: DOMException = "An ongoing operation was aborted, typically with a call to abort().",
		code: 20,
		message: "An ongoing operation was aborted, typically with a call to abort().",
		name: "AbortError",
		__proto__: DOMException,// 在手动取消读取文件时出现
		onabort: null,
		onerror: null,
		onload: null,
		onloadend: null,
		onloadstart: null,
		onprogress: null,
		readyState: 2,  // 0 empty 1 读取中 2 已完成
		result: "js权威指南↵js设计模式↵你不知道的JavaScript↵webUploader源码↵jQuery源码"
	},
	defaultPrevented: false,
	eventPhase: 0,
	loaded: 73,   // 已读取的字节数
	path: [],
	returnValue: true,
	srcElement: FileReader = {
		error: null,
		onabort: null,
		onerror: null,
		onload: null,
		onloadend: null,
		onloadstart: null,
		onprogress: null,
		readyState: 2, 
		result: "js权威指南↵js设计模式↵你不知道的JavaScript↵webUploader源码↵jQuery源码"
	},
	target: FileReader = {
		error: null,
		onabort: null,
		onerror: null,
		onload: null,
		onloadend: null,
		onloadstart: null,
		onprogress: null,
		readyState: 2, 
		result: "js权威指南↵js设计模式↵你不知道的JavaScript↵webUploader源码↵jQuery源码"
	},
	timeStamp: 6500.500000001921,
	total: 73,  // 文件总大小
    type: "progress" // 还有 loadstart load loadend 与fileReader的事件一一对应
}